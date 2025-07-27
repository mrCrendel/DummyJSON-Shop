import Products from "@/components/Products";
import ErrorPage from "@/components/ErrorPage";

export async function generateMetadata() {
  return {
    title: `Dummy Shop | Home`
  };
}
const LIMIT = 12

export default async function ProductsPage() {
  try {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}products?limit=${LIMIT}`
    )

    if (!res.ok) {
      const text = await res.text()
      return <ErrorPage error={Error(`Failed to fetch products: ${text}`)} />
    }

    const { products } = await res.json()
    return <Products products={products} />
  } catch (error) {
    return <ErrorPage error={error as Error} />
  }
}

