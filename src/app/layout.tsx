"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "@/context/context";
import { QueryClient, QueryClientProvider } from "react-query";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Promptopia",
//   description: "Discover & Share AI Prompt",
// };

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Promptopia</title>
        <meta name="description" content="Discover & Share AI Prompt"></meta>
      </head>
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <Nav />
            {children}
            <ToastContainer />
          </AuthContextProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
