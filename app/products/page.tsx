import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { createClient } from "@/lib/supabase/server"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "All Products - Premium Leather Goods | Artisan Leather Co.",
  description:
    "Browse our complete collection of handcrafted leather goods including handbags, wallets, belts and accessories. Premium quality with timeless design.",
}

export default async function ProductsPage() {
  const supabase = await createClient()

  // Fetch all active products
  const { data: products } = await supabase
    .from("products")
    .select(`
      *,
      categories (
        name,
        slug
      )
    `)
    .eq("active", true)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false })

  // Fetch categories for filtering
  const { data: categories } = await supabase.from("categories").select("*").order("name")

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">All Products</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Discover our complete collection of handcrafted leather goods, each piece made with exceptional
                attention to detail and built to last a lifetime.
              </p>
              <div className="text-sm text-muted-foreground">
                {products?.length || 0} {products?.length === 1 ? "product" : "products"}
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/products"
                className="px-4 py-2 rounded-full border bg-primary text-primary-foreground text-sm font-medium"
              >
                All Products
              </a>
              {categories?.map((category) => (
                <a
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="px-4 py-2 rounded-full border hover:bg-muted text-sm font-medium transition-colors"
                >
                  {category.name}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {products && products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="font-serif text-2xl font-semibold mb-4">No products found</h3>
                <p className="text-muted-foreground">
                  We're currently updating our collection. Please check back soon!
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
