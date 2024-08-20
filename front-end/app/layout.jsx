import { Montserrat, Nunito } from "next/font/google";
import Layout from "./components/layout";
import Script from "next/script";
import "./globals.css";

const inter = Nunito({subsets: ['latin'], weight: '400'});

export const metadata = {
  title: "My Shop",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>{children}</Layout>
        {/* {children} */}
        <Script type="module" src="https://unpkg.com/@splinetool/viewer@1.8.9/build/spline-viewer.js"></Script>
      </body>
    </html>
  );
}
