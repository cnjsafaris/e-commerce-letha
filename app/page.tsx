import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { StructuredData } from "@/components/structured-data"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import Image from "next/image"

export default async function HomePage() {
  const supabase = await createClient()

  // Fetch featured products
  const { data: featuredProducts } = await supabase
    .from("products")
    .select("*")
    .eq("featured", true)
    .eq("active", true)
    .limit(4)

  // Fetch categories
  const { data: categories } = await supabase.from("categories").select("*").limit(4)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <StructuredData type="organization" />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20 z-10" />
          <Image
            src="/luxury-leather-workshop.png"
            alt="Artisan crafting leather goods"
            fill
            className="object-cover"
            priority
          />
          <div className="relative z-20 text-center text-white max-w-2xl mx-auto px-4">
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">Premier Quality</h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Welcome to LethaShop - your destination for premier goods crafted with exceptional quality and attention to detail. Designs by L.S.
            </p>
            <Link href="/products">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Shop Collection
              </Button>
            </Link>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our carefully curated collections of premier goods, each piece crafted with attention to
                detail and built to exceed your expectations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories?.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="group relative aspect-square overflow-hidden rounded-lg"
                >
                  <Image
                    src={category.image_url || "/placeholder.svg?height=300&width=300"}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="font-serif text-xl font-semibold mb-2">{category.name}</h3>
                      <p className="text-sm opacity-90">{category.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover our most popular pieces from LethaShop, handpicked for their exceptional quality and premier craftsmanship.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {featuredProducts?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center">
              <Link href="/products">
                <Button variant="outline" size="lg">
                  View All Products
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Craftsmanship Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Artisan Craftsmanship</h2>
                <p className="text-muted-foreground mb-6">
                  Each piece in our collection is meticulously handcrafted by skilled artisans using traditional
                  techniques that have been perfected over generations. We source only the finest full-grain leather and
                  premium hardware to ensure every product meets our exacting standards.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <span>Premium full-grain leather</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <span>Hand-stitched construction</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <span>Lifetime craftsmanship guarantee</span>
                  </li>
                </ul>
                <Link href="/craftsmanship">
                  <Button variant="outline">Learn More About Our Process</Button>
                </Link>
              </div>
              <div className="relative aspect-square">
                <Image
                  src="/artisan-leather-stitching.png"
                  alt="Artisan crafting leather"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
