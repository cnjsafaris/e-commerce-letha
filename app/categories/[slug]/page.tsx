import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { StructuredData } from "@/components/structured-data"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: category } = await supabase
    .from("categories")
    .select("name, description")
    .eq("slug", slug)
    .single()

  if (!category) {
    return {
      title: "Category Not Found",
    }
  }

  const title = `${category.name} - Premium Leather Goods`
  const description =
    category.description ||
    `Shop our collection of premium ${category.name.toLowerCase()} made from the finest leather with exceptional craftsmanship.`

  return {
    title,
    description,
    keywords: [category.name.toLowerCase(), "leather goods", "handcrafted", "premium quality", "artisan made"],
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "Artisan Leather Co.",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `/categories/${slug}`,
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const supabase = await createClient()

  console.log("[v0] Fetching category with slug:", slug)

  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single()

  console.log("[v0] Category query result:", { category, categoryError })

  if (categoryError) {
    console.log("[v0] Category error:", categoryError)
    // If it's a PGRST116 error (no rows), show not found
    if (categoryError.code === "PGRST116") {
      notFound()
    }
    // For other errors, throw to show error page
    throw new Error(`Failed to fetch category: ${categoryError.message}`)
  }

  if (!category) {
    console.log("[v0] No category found for slug:", slug)
    notFound()
  }

  console.log("[v0] Fetching products for category:", category.id)

  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", category.id)
    .eq("active", true)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false })

  console.log("[v0] Products query result:", { productsCount: products?.length, productsError })

  if (productsError) {
    console.log("[v0] Products error:", productsError)
    // Don't fail the page if products can't be fetched, just show empty state
  }

  const breadcrumbItems = [
    { name: "Products", url: "/products" },
    { name: category.name, url: `/categories/${category.slug}` },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <StructuredData type="breadcrumb" data={breadcrumbItems} />

      <main className="flex-1">
        {/* Category Header */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <Breadcrumbs items={breadcrumbItems} />
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">{category.name}</h1>
              <p className="text-lg text-muted-foreground mb-8">{category.description}</p>
              <div className="text-sm text-muted-foreground">
                {products?.length || 0} {products?.length === 1 ? "product" : "products"}
              </div>
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
                <p className="text-muted-foreground mb-8">
                  We're currently updating our {category.name.toLowerCase()} collection. Please check back soon!
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
