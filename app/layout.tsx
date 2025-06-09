import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "RouletteBite - Restaurante de Comida Rápida con Temática de Casino",
  description:
    "Donde la emoción del casino se encuentra con la comida rápida. ¡Gira la ruleta y descubre tu próxima comida favorita!",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
