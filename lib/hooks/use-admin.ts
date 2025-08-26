"use client"

import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const supabase = createClient()
        
        // Check if user is authenticated
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        
        if (authError || !user) {
          setIsAdmin(false)
          router.push("/auth/login")
          return
        }

        // For jabezmageto78@gmail.com, skip database check for faster loading
        if (user.email === "jabezmageto78@gmail.com") {
          setIsAdmin(true)
          setIsLoading(false)
          return
        }

        // Check admin role for other users
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single()

        if (profileError || !profile || profile.role !== "admin") {
          setIsAdmin(false)
          router.push("/")
          return
        }

        setIsAdmin(true)
      } catch (error) {
        console.error("Admin check failed:", error)
        setIsAdmin(false)
        router.push("/auth/login")
      } finally {
        setIsLoading(false)
      }
    }

    checkAdmin()
  }, [router])

  return { isAdmin, isLoading }
}