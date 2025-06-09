import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RouletteBite - Restaurante de Comida Rápida con Temática de Casino",
    short_name: "RouletteBite",
    description:
      "Donde la emoción del casino se encuentra con la comida rápida. ¡Gira la ruleta y descubre tu próxima comida favorita!",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#E50000",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
