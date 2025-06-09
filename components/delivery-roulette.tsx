"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dices, Plus } from "lucide-react"
import confetti from "canvas-confetti"
import type { CartItem } from "./delivery-section"

const DELIVERY_ITEMS = [
  {
    id: "burger1",
    name: "Royal Flush Burger",
    price: 12.99,
    color: "#E50000",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "pizza1",
    name: "Pizza Ruleta",
    price: 15.99,
    color: "#000000",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "nachos1",
    name: "Jackpot Nachos",
    price: 10.99,
    color: "#E50000",
    image:
      "https://images.unsplash.com/photo-1582169296194-e4d644c48063?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "hotdog1",
    name: "High Roller Hot Dog",
    price: 9.99,
    color: "#000000",
    image:
      "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "wrap1",
    name: "Full House Wrap",
    price: 11.99,
    color: "#E50000",
    image:
      "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "combo1",
    name: "Lucky 6 Combo",
    price: 18.99,
    color: "#000000",
    image:
      "https://us.123rf.com/450wm/kovalnadiya/kovalnadiya2201/kovalnadiya220100523/192887001-quite-la-comida-palitos-de-mozzarella-aros-de-cebolla-papas-fritas-nuggets-de-pollo-y-salsa-en.jpg?ver=6",
  },
  {
    id: "drink1",
    name: "Casino Cola",
    price: 3.99,
    color: "#E50000",
    image:
      "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "dessert1",
    name: "Jackpot Brownie",
    price: 7.99,
    color: "#000000",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
]

interface DeliveryRouletteProps {
  onAddToCart: (item: Omit<CartItem, "quantity">) => void
}

export default function DeliveryRoulette({ onAddToCart }: DeliveryRouletteProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [spinning, setSpinning] = useState(false)
  const [selectedItem, setSelectedItem] = useState<(typeof DELIVERY_ITEMS)[0] | null>(null)
  const [angle, setAngle] = useState(0)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 10

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw wheel segments
    const sliceAngle = (2 * Math.PI) / DELIVERY_ITEMS.length

    DELIVERY_ITEMS.forEach((item, i) => {
      const startAngle = i * sliceAngle + angle
      const endAngle = (i + 1) * sliceAngle + angle

      // Draw segment
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()
      ctx.fillStyle = item.color
      ctx.fill()
      ctx.strokeStyle = "#D4AF37"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw text
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(startAngle + sliceAngle / 2)
      ctx.textAlign = "right"
      ctx.fillStyle = "#FFFFFF"
      ctx.font = "bold 10px Arial"
      ctx.fillText(item.name, radius - 15, 5)
      ctx.restore()
    })

    // Draw center circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, 15, 0, 2 * Math.PI)
    ctx.fillStyle = "#D4AF37"
    ctx.fill()

    // Draw pointer
    ctx.beginPath()
    ctx.moveTo(centerX + radius + 10, centerY)
    ctx.lineTo(centerX + radius - 10, centerY - 15)
    ctx.lineTo(centerX + radius - 10, centerY + 15)
    ctx.closePath()
    ctx.fillStyle = "#E50000"
    ctx.fill()
    ctx.strokeStyle = "#FFFFFF"
    ctx.lineWidth = 2
    ctx.stroke()
  }, [angle])

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#E50000", "#D4AF37", "#000000", "#FFFFFF"],
    })
  }

  const spinWheel = () => {
    if (spinning) return

    setSpinning(true)
    setSelectedItem(null)

    const spinAngle = (2 + Math.random() * 3) * 2 * Math.PI
    const spinDuration = 3000 + Math.random() * 2000
    const startTime = Date.now()
    const startAngle = angle

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / spinDuration, 1)

      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
      const currentRotation = startAngle + spinAngle * easeOut(progress)

      setAngle(currentRotation)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        const normalizedAngle = currentRotation % (2 * Math.PI)
        const sliceAngle = (2 * Math.PI) / DELIVERY_ITEMS.length
        const selectedIndex =
          DELIVERY_ITEMS.length - 1 - (Math.floor(normalizedAngle / sliceAngle) % DELIVERY_ITEMS.length)
        setSelectedItem(DELIVERY_ITEMS[selectedIndex])
        setSpinning(false)
        triggerConfetti()
      }
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Card className="border-[#D4AF37] bg-gray-900">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-center">
              <Dices className="mr-2 h-6 w-6 text-[#D4AF37]" />
              <h3 className="text-xl font-bold text-white">Ruleta Delivery</h3>
            </div>
            <p className="text-gray-300">
              ¿No sabes qué pedir? ¡Deja que la suerte decida! Gira la ruleta y descubre tu próxima comida a domicilio.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <div className="flex flex-col items-center">
        <motion.div
          className="relative mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <canvas
            ref={canvasRef}
            width={350}
            height={350}
            className="rounded-full border-4 border-[#D4AF37] shadow-lg"
            style={{ filter: "drop-shadow(0 0 10px rgba(212, 175, 55, 0.5))" }}
          />
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mb-6">
          <Button
            onClick={spinWheel}
            disabled={spinning}
            className="bg-[#D4AF37] px-8 py-3 text-lg font-bold text-black hover:bg-[#B8860B]"
          >
            {spinning ? (
              <span className="flex items-center">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                  className="mr-2 inline-block h-4 w-4 rounded-full border-2 border-t-transparent border-white"
                ></motion.span>
                Girando...
              </span>
            ) : (
              <>
                <Dices className="mr-2 h-5 w-5" />
                ¡Girar Ruleta Delivery!
              </>
            )}
          </Button>
        </motion.div>

        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-md"
            >
              <Card className="border-[#D4AF37] bg-gray-900">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-center">
                    <img
                      src={selectedItem.image || "/placeholder.svg"}
                      alt={selectedItem.name}
                      className="h-20 w-20 rounded-full object-cover"
                    />
                  </div>
                  <h3 className="mb-2 text-center text-xl font-bold text-white">{selectedItem.name}</h3>
                  <p className="mb-4 text-center text-2xl font-bold text-[#D4AF37]">${selectedItem.price}</p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() =>
                        onAddToCart({
                          id: selectedItem.id,
                          name: selectedItem.name,
                          price: selectedItem.price,
                          image: selectedItem.image,
                        })
                      }
                      className="w-full bg-red-600 text-white hover:bg-red-700"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Agregar al Carrito
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
