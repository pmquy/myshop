import { Suspense } from "react";
import { ProductProvider } from "./hooks";

export default function Layout({ children }) {
  return <ProductProvider>
    <Suspense>
      <div className="bg-white-1">
        {children}
      </div>
    </Suspense>
  </ProductProvider>
};
