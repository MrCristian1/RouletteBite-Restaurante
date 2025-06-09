"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { CartItem } from "./delivery-section"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  rating: number
  popular?: boolean
}

const menuItems: MenuItem[] = [
  {
    id: "burger1",
    name: "Royal Flush Burger",
    description: "Hamburguesa premium con carne Angus, queso cheddar, bacon y salsa especial.",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Hamburguesas",
    rating: 4.8,
    popular: true,
  },
  {
    id: "pizza1",
    name: "Pizza Ruleta",
    description: "Pizza dividida en 8 secciones con sabores diferentes.",
    price: 15.99,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Pizzas",
    rating: 4.9,
    popular: true,
  },
  {
    id: "nachos1",
    name: "Jackpot Nachos",
    description: "Nachos cargados con queso, guacamole, jalapeños y carne.",
    price: 10.99,
    image:
      "https://images.unsplash.com/photo-1582169296194-e4d644c48063?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Aperitivos",
    rating: 4.7,
  },
  {
    id: "hotdog1",
    name: "High Roller Hot Dog",
    description: "Hot dog gourmet con chili, queso y toppings premium.",
    price: 9.99,
    image:
      "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Hot Dogs",
    rating: 4.6,
  },
  {
    id: "wrap1",
    name: "Full House Wrap",
    description: "Wrap con pollo a la parrilla, verduras frescas y aguacate.",
    price: 11.99,
    image:
      "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Wraps",
    rating: 4.5,
  },
  {
    id: "combo1",
    name: "Lucky 6 Combo",
    description: "6 delicias: alitas, aros de cebolla, papas, nuggets, palitos de mozzarella y dip.",
    price: 18.99,
    image:
      "https://us.123rf.com/450wm/kovalnadiya/kovalnadiya2201/kovalnadiya220100523/192887001-quite-la-comida-palitos-de-mozzarella-aros-de-cebolla-papas-fritas-nuggets-de-pollo-y-salsa-en.jpg?ver=6",
    category: "Combos",
    rating: 4.8,
  },
  {
    id: "drink1",
    name: "Casino Cola",
    description: "Refresco especial de la casa con un toque misterioso.",
    price: 3.99,
    image:
      "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Bebidas",
    rating: 4.3,
  },
  {
    id: "dessert1",
    name: "Jackpot Brownie",
    description: "Brownie de chocolate con helado y salsa de caramelo.",
    price: 7.99,
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Postres",
    rating: 4.9,
  },
]

const categories = [
  "Todos",
  "Hamburguesas",
  "Pizzas",
  "Aperitivos",
  "Hot Dogs",
  "Wraps",
  "Combos",
  "Bebidas",
  "Postres",
]

interface DeliveryMenuProps {
  onAddToCart: (item: Omit<CartItem, "quantity">) => void
}

export default function DeliveryMenu({ onAddToCart }: DeliveryMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  const filteredItems =
    selectedCategory === "Todos" ? menuItems : menuItems.filter((item) => item.category === selectedCategory)

  return (
    <div>
      {/* Filtros de categoría */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`${
                selectedCategory === category
                  ? "bg-[#D4AF37] text-black hover:bg-[#B8860B]"
                  : "border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Grid de productos */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="group h-full overflow-hidden border-[#D4AF37] bg-gray-900 transition-transform hover:scale-105">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {item.popular && <Badge className="absolute left-2 top-2 bg-red-600 text-white">Popular</Badge>}
                <div className="absolute bottom-2 right-2 flex items-center rounded-md bg-black/70 px-2 py-1">
                  <Star className="mr-1 h-3 w-3 fill-[#D4AF37] text-[#D4AF37]" />
                  <span className="text-xs text-white">{item.rating}</span>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="font-serif text-lg font-bold text-white">{item.name}</h3>
                  <span className="text-lg font-bold text-[#D4AF37]">${item.price}</span>
                </div>
                <p className="mb-4 text-sm text-gray-300">{item.description}</p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() =>
                      onAddToCart({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                      })
                    }
                    className="w-full bg-[#D4AF37] text-black hover:bg-[#B8860B]"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar al Carrito
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
