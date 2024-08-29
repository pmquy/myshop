'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Header from "./header"
import Footer from "./footer"
import { MetaDataProvider } from "../hooks"
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
})

export default function Layout({ children }) {
  // cannot sticky with overflow parent return <div className="bg-white-1 text-black-1 overflow-x-hidden">
  return <div className="text-black-1 min-h-screen">
    <QueryClientProvider client={queryClient}>
      <MetaDataProvider>
        <div className=" sticky top-0 z-10">
          <Header />
        </div>
        {children}
        <Footer />
      </MetaDataProvider>
    </QueryClientProvider >
  </div>
};
