import { ProductProvider } from "./hooks";

export default function Layout({ children }) {
  return <ProductProvider>
    <div className="bg-white-1">
      {children}
    </div>
  </ProductProvider>
};
