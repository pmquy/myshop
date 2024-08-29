'use client'
import { ProductProvider } from "@/app/product/hooks";

export default function Layout({children}) {
  return <ProductProvider>{children}</ProductProvider>
}