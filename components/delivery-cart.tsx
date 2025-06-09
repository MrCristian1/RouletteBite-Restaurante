"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, Plus, Minus, Trash2, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import type { CartItem } from "./delivery-section"

interface DeliveryCartProps {
  items: CartItem[]
  onUpdateQuantity: (id: string, quantity: number) => void
  totalItems: number
  totalPrice: number
  isOpen: boolean
  onToggle: () => void
}

export default function DeliveryCart({
  items,
  onUpdateQuantity,
  totalItems,
  totalPrice,
  isOpen,
  onToggle,
}: DeliveryCartProps) {
  const [showCheckout, setShowCheckout] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const deliveryFee = totalPrice >= 25 ? 0 : 3.99
  const finalTotal = totalPrice + deliveryFee

  const handleCheckout = () => {
    setOrderComplete(true)
    setTimeout(() => {
      setOrderComplete(false)
      setShowCheckout(false)
    }, 3000)
  }

  return (
    <div className="sticky top-20">
      <Card className="border-[#D4AF37] bg-gray-900">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-white">
            <div className="flex items-center">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Mi Carrito
            </div>
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs text-white"
              >
                {totalItems}
              </motion.span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AnimatePresence>
            {items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-8 text-center text-gray-400"
              >
                <ShoppingCart className="mx-auto mb-4 h-12 w-12" />
                <p>Tu carrito está vacío</p>
                <p className="text-sm">¡Agrega algunos productos!</p>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center space-x-3 rounded-lg bg-gray-800 p-3"
                    >
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-white">{item.name}</h4>
                        <p className="text-sm text-[#D4AF37]">${item.price}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="h-6 w-6 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-white">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="h-6 w-6 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onUpdateQuantity(item.id, 0)}
                          className="h-6 w-6 p-0 text-red-500 hover:text-red-400"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <Separator className="my-4 bg-gray-700" />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Envío:</span>
                    <span>{deliveryFee === 0 ? "Gratis" : `$${deliveryFee.toFixed(2)}`}</span>
                  </div>
                  <Separator className="bg-gray-700" />
                  <div className="flex justify-between text-lg font-bold text-[#D4AF37]">
                    <span>Total:</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-4">
                  <Button
                    onClick={() => setShowCheckout(true)}
                    className="w-full bg-[#D4AF37] text-black hover:bg-[#B8860B]"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Proceder al Pago
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Modal de Checkout */}
      <AnimatePresence>
        {showCheckout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setShowCheckout(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <Card className="border-[#D4AF37] bg-gray-900">
                <CardHeader>
                  <CardTitle className="text-center text-white">
                    {orderComplete ? "¡Pedido Confirmado!" : "Finalizar Pedido"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {orderComplete ? (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 }}
                          className="text-2xl"
                        >
                          ✅
                        </motion.div>
                      </div>
                      <h3 className="mb-2 text-xl font-bold text-green-400">¡Gracias por tu pedido!</h3>
                      <p className="mb-4 text-gray-300">
                        Tu comida estará lista en 30-45 minutos. Te enviaremos actualizaciones por SMS.
                      </p>
                      <p className="text-sm text-[#D4AF37]">Total: ${finalTotal.toFixed(2)}</p>
                    </motion.div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="address" className="text-white">
                          Dirección de Entrega
                        </Label>
                        <Input id="address" placeholder="Tu dirección completa" className="bg-gray-800 text-white" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-white">
                          Teléfono
                        </Label>
                        <Input id="phone" placeholder="Tu número de teléfono" className="bg-gray-800 text-white" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notes" className="text-white">
                          Notas Especiales
                        </Label>
                        <Input id="notes" placeholder="Instrucciones adicionales" className="bg-gray-800 text-white" />
                      </div>
                      <Separator className="bg-gray-700" />
                      <div className="text-center">
                        <p className="mb-2 text-lg font-bold text-[#D4AF37]">Total: ${finalTotal.toFixed(2)}</p>
                        <Button onClick={handleCheckout} className="w-full bg-green-600 text-white hover:bg-green-700">
                          Confirmar Pedido
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
