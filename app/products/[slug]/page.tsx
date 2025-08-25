import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { Badge } from "@/components/ui/badge"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { StructuredData } from "@/components/structured-data"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Image from "next/image"
import { Heart, Share2 } from "lucide-react"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: product } = await supabase
    .from("products")
    .select("name, description, meta_title, meta_description, images, price, categories(name)")
    .eq("slug", slug)
    .eq("active", true)
    .single()

  if (!product) {
    return {
      title: "Product Not Found",
    }
  }

  const title = product.meta_title || `${product.name} - Premium Leather Goods`
  const description =
    product.meta_description ||
    product.description ||
    `Shop the ${product.name} - handcrafted premium leather goods with exceptional quality and timeless design.`

  return {
    title,
    description,
    keywords: [
      product.name.toLowerCase(),
      product.categories?.name.toLowerCase(),
      "leather goods",
      "handcrafted",
      "premium quality",
      "artisan made",
    ],
    openGraph: {
      title,
      description,
      type: "product",
      images: product.images?.[0]
        ? [
            {
              url: product.images[0],
              width: 800,
              height: 800,
              alt: product.name,
            },
          ]
        : [],
      siteName: "Artisan Leather Co.",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: product.images?.[0] ? [product.images[0]] : [],
    },
    alternates: {
      canonical: `/products/${slug}`,
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const supabase = await createClient()

  // Fetch product
  const { data: product } = await supabase
    .from("products")
    .select(`
      *,
      categories (
        name,
        slug
      )
    `)
    .eq("slug", slug)
    .eq("active", true)
    .single()

  if (!product) {
    notFound()
  }

  // Fetch related products
  const { data: relatedProducts } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", product.category_id)
    .neq("id", product.id)
    .eq("active", true)
    .limit(4)

  const discountPercentage = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0

  const breadcrumbItems = [
    { name: "Products", url: "/products" },
    { name: product.categories?.name || "Category", url: `/categories/${product.categories?.slug}` },
    { name: product.name, url: `/products/${product.slug}` },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <StructuredData type="product" data={product} />
      <StructuredData type="breadcrumb" data={breadcrumbItems} />

      <main className="flex-1">
        {/* Product Details */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <Breadcrumbs items={breadcrumbItems} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={product.images?.[0] || "/placeholder.svg?height=600&width=600"}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  {product.compare_at_price && (
                    <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                      {discountPercentage}% OFF
                    </Badge>
                  )}
                </div>

                {/* Additional Images */}
                {product.images && product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {product.images.slice(1, 5).map((image, index) => (
                      <div key={index} className="relative aspect-square overflow-hidden rounded-md">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${product.name} view ${index + 2}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-2xl">${product.price.toFixed(2)}</span>
                      {product.compare_at_price && (
                        <span className="text-lg text-muted-foreground line-through">
                          ${product.compare_at_price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    {product.featured && <Badge variant="secondary">Featured</Badge>}
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>
                </div>

                {/* Add to Cart */}
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    {product.inventory_quantity > 0 ? (
                      <span className="text-green-600">In stock ({product.inventory_quantity} available)</span>
                    ) : (
                      <span className="text-red-600">Out of stock</span>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <AddToCartButton product={product} className="flex-1" />
                    <Button variant="outline" size="lg">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="lg">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Product Details */}
                <div className="border-t pt-6 space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Product Details</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>SKU: {product.sku}</li>
                      <li>Material: Premium full-grain leather</li>
                      <li>Hardware: Solid brass fittings</li>
                      <li>Construction: Hand-stitched</li>
                      <li>Origin: Handcrafted in our workshop</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Care Instructions</h3>
                    <p className="text-sm text-muted-foreground">
                      Clean with a soft, dry cloth. Apply leather conditioner every 3-6 months. Avoid exposure to
                      excessive moisture and direct sunlight.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="font-serif text-3xl font-bold text-center mb-12">You Might Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
