import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: string
  name: string
  slug: string
  price: number
  compare_at_price?: number
  images: string[]
  featured: boolean
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const discountPercentage = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0

  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.images[0] || "/placeholder.svg?height=400&width=400"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.compare_at_price && (
            <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">{discountPercentage}% OFF</Badge>
          )}
          {product.featured && (
            <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">Featured</Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-sm mb-2 line-clamp-2 group-hover:text-accent transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg">${product.price.toFixed(2)}</span>
            {product.compare_at_price && (
              <span className="text-sm text-muted-foreground line-through">${product.compare_at_price.toFixed(2)}</span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
