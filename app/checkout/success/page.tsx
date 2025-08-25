"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function CheckoutSuccessContent() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('order') || `LS-${Date.now().toString().slice(-6)}`

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardContent className="p-12">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />

                <h1 className="font-serif text-3xl font-bold mb-4">Order Confirmed!</h1>

                <p className="text-muted-foreground mb-6">
                  Thank you for your order! Your order has been successfully placed and will be processed soon. You'll pay upon delivery.
                </p>

                <div className="bg-muted/50 rounded-lg p-4 mb-8">
                  <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                  <p className="font-mono font-semibold text-lg">{orderNumber}</p>
                </div>

                <div className="space-y-4 text-sm text-muted-foreground mb-8">
                  <p>
                    We'll contact you soon to confirm your order details and arrange delivery.
                  </p>
                  <p>Your premier goods will be carefully prepared and delivered within 3-5 business days.</p>
                  <p className="font-medium text-foreground">Payment: Cash on Delivery (COD)</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/products">
                    <Button size="lg">Continue Shopping</Button>
                  </Link>
                  <Link href="/">
                    <Button variant="outline" size="lg">
                      Return to Home
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutSuccessContent />
    </Suspense>
  )
}
