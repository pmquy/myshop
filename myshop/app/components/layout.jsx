'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Header from "./header"
import Footer from "./footer"
import { UserProvider } from "../hooks"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
})

export default function Layout({ children }) {
  // cannot sticky with overflow parent return <div className="bg-white-1 text-black-1 overflow-x-hidden">
  return <div className="text-black-1">
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <div className=" sticky top-0 z-10">
          <Header />
        </div>
        {children}
        <Footer />
      </UserProvider>
    </QueryClientProvider >
  </div>
};
