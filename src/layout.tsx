"use client"

import { Inter } from "next/font/google"
import { RouterProvider } from "react-router-dom"
import Routing from "./config/router.config"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout() {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RouterProvider router={Routing} />
      </body>
    </html>
  )
}

