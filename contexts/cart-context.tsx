"use client"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"
import { createClient } from "@/lib/supabase/client"

interface CartItem {
  id: string
  product_id: string
  name: string
  price: number
  image: string
  quantity: number
  slug: string
}

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
  isLoading: boolean
}

type CartAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_CART"; payload: CartItem[] }
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "CLEAR_CART" }

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  isLoading: false,
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload }

    case "SET_CART":
      const total = action.payload.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const itemCount = action.payload.reduce((sum, item) => sum + item.quantity, 0)
      return {
        ...state,
        items: action.payload,
        total,
        itemCount,
        isLoading: false,
      }

    case "ADD_ITEM": {
      const existingItem = state.items.find((item) => item.product_id === action.payload.product_id)
      let newItems: CartItem[]

      if (existingItem) {
        newItems = state.items.map((item) =>
          item.product_id === action.payload.product_id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item,
        )
      } else {
        newItems = [...state.items, action.payload]
      }

      const newTotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return {
        ...state,
        items: newItems,
        total: newTotal,
        itemCount: newItemCount,
      }
    }

    case "UPDATE_QUANTITY": {
      const newItems = state.items.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item,
      )
      const newTotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return {
        ...state,
        items: newItems,
        total: newTotal,
        itemCount: newItemCount,
      }
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.id !== action.payload)
      const newTotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return {
        ...state,
        items: newItems,
        total: newTotal,
        itemCount: newItemCount,
      }
    }

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0,
      }

    default:
      return state
  }
}

interface CartContextType extends CartState {
  addItem: (product: any, quantity?: number) => Promise<void>
  updateQuantity: (id: string, quantity: number) => Promise<void>
  removeItem: (id: string) => Promise<void>
  clearCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage and Supabase on mount
  useEffect(() => {
    const loadCart = async () => {
      dispatch({ type: "SET_LOADING", payload: true })
      const supabase = createClient()
      
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        // Load from Supabase
        try {
          const { data: cartItems, error } = await supabase
            .from('cart_items')
            .select(`
              *,
              products (
                name,
                price,
                images,
                slug
              )
            `)
            .eq('user_id', user.id)
          
          if (error) throw error
          
          const formattedItems = cartItems?.map(item => ({
            id: item.id,
            product_id: item.product_id,
            name: item.products.name,
            price: item.products.price,
            image: item.products.images?.[0] || "/placeholder.svg",
            quantity: item.quantity,
            slug: item.products.slug,
          })) || []
          
          dispatch({ type: "SET_CART", payload: formattedItems })
        } catch (error) {
          // Silently fallback to localStorage if Supabase fails
          // Only log in development for debugging
          if (process.env.NODE_ENV === 'development') {
            console.log("Cart: Falling back to localStorage (Supabase unavailable)")
          }
          const savedCart = localStorage.getItem("cart")
          if (savedCart) {
            try {
              const cartItems = JSON.parse(savedCart)
              dispatch({ type: "SET_CART", payload: cartItems })
            } catch (storageError) {
              // Silent fallback - don't log storage errors in production
              if (process.env.NODE_ENV === 'development') {
                console.warn("Cart: LocalStorage parsing failed:", storageError)
              }
              dispatch({ type: "SET_CART", payload: [] })
            }
          } else {
            // Initialize empty cart
            dispatch({ type: "SET_CART", payload: [] })
          }
        }
      } else {
        // Load from localStorage for guests
        const savedCart = localStorage.getItem("cart")
        if (savedCart) {
          try {
            const cartItems = JSON.parse(savedCart)
            dispatch({ type: "SET_CART", payload: cartItems })
          } catch (error) {
            console.error("Error loading cart from localStorage:", error)
          }
        }
      }
      dispatch({ type: "SET_LOADING", payload: false })
    }
    
    loadCart()
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!state.isLoading) {
      localStorage.setItem("cart", JSON.stringify(state.items))
    }
  }, [state.items, state.isLoading])

  const addItem = async (product: any, quantity = 1) => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      try {
        // Check if item already exists in cart
        const { data: existingItem } = await supabase
          .from('cart_items')
          .select('*')
          .eq('user_id', user.id)
          .eq('product_id', product.id)
          .single()
        
        if (existingItem) {
          // Update existing item
          const { error } = await supabase
            .from('cart_items')
            .update({ quantity: existingItem.quantity + quantity })
            .eq('id', existingItem.id)
          
          if (error) throw error
        } else {
          // Insert new item
          const { error } = await supabase
            .from('cart_items')
            .insert({
              user_id: user.id,
              product_id: product.id,
              quantity
            })
          
          if (error) throw error
        }
        
        // Reload cart from Supabase
        const { data: cartItems, error: fetchError } = await supabase
          .from('cart_items')
          .select(`
            *,
            products (
              name,
              price,
              images,
              slug
            )
          `)
          .eq('user_id', user.id)
        
        if (fetchError) throw fetchError
        
        const formattedItems = cartItems?.map(item => ({
          id: item.id,
          product_id: item.product_id,
          name: item.products.name,
          price: item.products.price,
          image: item.products.images?.[0] || "/placeholder.svg",
          quantity: item.quantity,
          slug: item.products.slug,
        })) || []
        
        dispatch({ type: "SET_CART", payload: formattedItems })
      } catch (error) {
        console.log("Adding item to local cart (Supabase unavailable)")
        // Fallback to local cart
        const cartItem: CartItem = {
          id: `${product.id}-${Date.now()}`,
          product_id: product.id,
          name: product.name,
          price: product.price,
          image: product.images?.[0] || "/placeholder.svg",
          quantity,
          slug: product.slug,
        }
        dispatch({ type: "ADD_ITEM", payload: cartItem })
      }
    } else {
      // Guest user - use local storage
      const cartItem: CartItem = {
        id: `${product.id}-${Date.now()}`,
        product_id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || "/placeholder.svg",
        quantity,
        slug: product.slug,
      }
      dispatch({ type: "ADD_ITEM", payload: cartItem })
    }
  }

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity <= 0) {
      await removeItem(id)
      return
    }
    
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity })
          .eq('id', id)
        
        if (error) throw error
      } catch (error) {
        console.log("Updating quantity locally (Supabase unavailable)")
      }
    }
    
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const removeItem = async (id: string) => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('id', id)
        
        if (error) throw error
      } catch (error) {
        console.log("Removing item locally (Supabase unavailable)")
      }
    }
    
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const clearCart = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id)
        
        if (error) throw error
      } catch (error) {
        console.log("Clearing cart locally (Supabase unavailable)")
      }
    }
    
    dispatch({ type: "CLEAR_CART" })
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
