"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { Search } from "lucide-react"
import { useState, useEffect } from "react"

interface SearchPageProps {
  searchParams: {
    q?: string
  }
}

export default function SearchPageClient({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""
  const [products, setProducts] = useState<any[] | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()
      if (query) {
        // Search products by name and description
        const { data } = await supabase
          .from("products")
          .select(`
            *,
            categories (
              name,
              slug
            )
          `)
          .eq("active", true)
          .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
          .order("featured", { ascending: false })
          .order("created_at", { ascending: false })

        setProducts(data)
      } else {
        setProducts(null)
      }
    }

    fetchData()
  }, [query])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Search Header */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-center mb-8">Search Products</h1>

              {/* Search Form */}
              <form method="GET" className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input name="q" placeholder="Search for leather goods..." defaultValue={query} className="pl-10" />
                </div>
                <Button type="submit">Search</Button>
              </form>

              {query && (
                <p className="text-center text-muted-foreground mt-4">
                  {products?.length || 0} results for "{query}"
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Search Results */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {query ? (
              products && products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="font-serif text-2xl font-semibold mb-4">No products found</h3>
                  <p className="text-muted-foreground mb-8">
                    We couldn't find any products matching "{query}". Try searching with different keywords.
                  </p>
                  <Button variant="outline" onClick={() => window.history.back()}>
                    Go Back
                  </Button>
                </div>
              )
            ) : (
              <div className="text-center py-16">
                <h3 className="font-serif text-2xl font-semibold mb-4">Start Your Search</h3>
                <p className="text-muted-foreground">
                  Enter a search term above to find the perfect leather goods for you.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
