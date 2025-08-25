import SearchPageClient from "./SearchPageClient"
import type { Metadata } from "next"

interface SearchPageProps {
  searchParams: {
    q?: string
  }
}

export const metadata: Metadata = {
  title: "Search Products - Artisan Leather Co.",
  description: "Search our collection of premium handcrafted leather goods.",
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  return <SearchPageClient searchParams={searchParams} />
}
