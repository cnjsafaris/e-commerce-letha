interface Product {
  id: string
  name: string
  description: string
  price: number
  compare_at_price?: number
  images: string[]
  sku: string
  categories?: {
    name: string
  }
}

interface StructuredDataProps {
  type: "product" | "organization" | "breadcrumb"
  data?: any
}

export function StructuredData({ type, data }: StructuredDataProps) {
  let structuredData = {}

  switch (type) {
    case "organization":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Artisan Leather Co.",
        description: "Premium handcrafted leather goods made with exceptional quality and timeless design.",
        url: "https://artisan-leather-co.vercel.app",
        logo: "https://artisan-leather-co.vercel.app/logo.png",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+1-555-123-4567",
          contactType: "Customer Service",
          availableLanguage: "English",
        },
        sameAs: [
          "https://facebook.com/artisanleatherco",
          "https://instagram.com/artisanleatherco",
          "https://twitter.com/artisanleatherco",
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: "123 Craft Street",
          addressLocality: "San Francisco",
          addressRegion: "CA",
          postalCode: "94102",
          addressCountry: "US",
        },
      }
      break

    case "product":
      if (data) {
        structuredData = {
          "@context": "https://schema.org",
          "@type": "Product",
          name: data.name,
          description: data.description,
          sku: data.sku,
          brand: {
            "@type": "Brand",
            name: "Artisan Leather Co.",
          },
          category: data.categories?.name || "Leather Goods",
          image: data.images?.map((img: string) => `https://artisan-leather-co.vercel.app${img}`) || [],
          offers: {
            "@type": "Offer",
            price: data.price,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            seller: {
              "@type": "Organization",
              name: "Artisan Leather Co.",
            },
            ...(data.compare_at_price && {
              priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
            }),
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            reviewCount: "127",
            bestRating: "5",
            worstRating: "1",
          },
          review: [
            {
              "@type": "Review",
              reviewRating: {
                "@type": "Rating",
                ratingValue: "5",
                bestRating: "5",
              },
              author: {
                "@type": "Person",
                name: "Sarah Johnson",
              },
              reviewBody: "Exceptional quality and craftsmanship. This leather bag exceeded my expectations.",
            },
          ],
        }
      }
      break

    case "breadcrumb":
      if (data) {
        structuredData = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: data.map((item: any, index: number) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `https://artisan-leather-co.vercel.app${item.url}`,
          })),
        }
      }
      break
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}
