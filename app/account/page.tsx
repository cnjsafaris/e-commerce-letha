import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Package, MapPin, Settings } from "lucide-react"
import Link from "next/link"

export default async function AccountPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Fetch user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

  // Fetch recent orders
  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", data.user.id)
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="font-serif text-3xl font-bold mb-2">My Account</h1>
              <p className="text-muted-foreground">Welcome back, {profile?.first_name || data.user.email}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Profile */}
              <Link href="/account/profile">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <User className="h-8 w-8 mx-auto mb-3 text-accent" />
                    <h3 className="font-medium mb-1">Profile</h3>
                    <p className="text-sm text-muted-foreground">Manage your personal information</p>
                  </CardContent>
                </Card>
              </Link>

              {/* Orders */}
              <Link href="/account/orders">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Package className="h-8 w-8 mx-auto mb-3 text-accent" />
                    <h3 className="font-medium mb-1">Orders</h3>
                    <p className="text-sm text-muted-foreground">View your order history</p>
                  </CardContent>
                </Card>
              </Link>

              {/* Addresses */}
              <Link href="/account/addresses">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <MapPin className="h-8 w-8 mx-auto mb-3 text-accent" />
                    <h3 className="font-medium mb-1">Addresses</h3>
                    <p className="text-sm text-muted-foreground">Manage shipping addresses</p>
                  </CardContent>
                </Card>
              </Link>

              {/* Settings */}
              <Link href="/account/settings">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Settings className="h-8 w-8 mx-auto mb-3 text-accent" />
                    <h3 className="font-medium mb-1">Settings</h3>
                    <p className="text-sm text-muted-foreground">Account preferences</p>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                {orders && orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">Order #{order.order_number}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${order.total_amount.toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground capitalize">{order.status}</p>
                        </div>
                      </div>
                    ))}
                    <Link href="/account/orders">
                      <Button variant="outline" className="w-full bg-transparent">
                        View All Orders
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-4">No orders yet</p>
                    <Link href="/products">
                      <Button>Start Shopping</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
