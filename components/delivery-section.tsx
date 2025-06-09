"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Truck, Clock, MapPin, Dices } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import DeliveryMenu from "./delivery-menu"
import DeliveryCart from "./delivery-cart"
import DeliveryRoulette from "./delivery-roulette"

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export default function DeliverySection() {
  const [activeTab, setActiveTab] = useState<"menu" | "roulette">("menu")
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id))
    } else {
      setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (
    <section id="delivery" className="bg-black py-16 text-white">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-2 font-serif text-3xl font-bold text-white md:text-4xl">Delivery a Domicilio</h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "5rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto h-1 bg-[#D4AF37]"
          ></motion.div>
          <p className="mx-auto mt-4 max-w-2xl text-gray-300">
            ¡Lleva la experiencia RouletteBite a tu hogar! Ordena tu comida favorita o deja que la ruleta decida por ti.
          </p>
        </motion.div>

        {/* Información de delivery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          <Card className="border-[#D4AF37] bg-gray-900">
            <CardContent className="flex items-center p-4">
              <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-600">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">Envío Gratis</h3>
                <p className="text-sm text-gray-300">En pedidos mayores a $25</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#D4AF37] bg-gray-900">
            <CardContent className="flex items-center p-4">
              <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-600">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">30-45 min</h3>
                <p className="text-sm text-gray-300">Tiempo de entrega</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#D4AF37] bg-gray-900">
            <CardContent className="flex items-center p-4">
              <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-600">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">Zona de Entrega</h3>
                <p className="text-sm text-gray-300">Radio de 10 km</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs para menú y ruleta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex justify-center">
            <div className="flex rounded-lg bg-gray-900 p-1">
              <Button
                onClick={() => setActiveTab("menu")}
                className={`mr-2 ${
                  activeTab === "menu"
                    ? "bg-[#D4AF37] text-black hover:bg-[#B8860B]"
                    : "bg-transparent text-white hover:bg-gray-800"
                }`}
              >
                Ver Menú
              </Button>
              <Button
                onClick={() => setActiveTab("roulette")}
                className={`flex items-center ${
                  activeTab === "roulette"
                    ? "bg-[#D4AF37] text-black hover:bg-[#B8860B]"
                    : "bg-transparent text-white hover:bg-gray-800"
                }`}
              >
                <Dices className="mr-2 h-4 w-4" />
                Ruleta Delivery
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Contenido principal */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {activeTab === "menu" ? (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <DeliveryMenu onAddToCart={addToCart} />
                </motion.div>
              ) : (
                <motion.div
                  key="roulette"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <DeliveryRoulette onAddToCart={addToCart} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Carrito */}
          <div className="lg:col-span-1">
            <DeliveryCart
              items={cartItems}
              onUpdateQuantity={updateQuantity}
              totalItems={getTotalItems()}
              totalPrice={getTotalPrice()}
              isOpen={isCartOpen}
              onToggle={() => setIsCartOpen(!isCartOpen)}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
