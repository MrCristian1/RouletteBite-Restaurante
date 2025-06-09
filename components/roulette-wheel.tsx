"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"

const MENU_ITEMS = [
  { name: "Hamburguesa Clásica", color: "#E50000" },
  { name: "Pizza Suprema", color: "#000000" },
  { name: "Alitas Picantes", color: "#E50000" },
  { name: "Nachos Casino", color: "#000000" },
  { name: "Hot Dog Royal", color: "#E50000" },
  { name: "Wrap Misterioso", color: "#000000" },
  { name: "Ensalada Fortune", color: "#E50000" },
  { name: "Papas Jackpot", color: "#000000" },
]

export default function RouletteWheel() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [spinning, setSpinning] = useState(false)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [angle, setAngle] = useState(0)
  const [spinAngle, setSpinAngle] = useState(0)
  const animationRef = useRef<number | null>(null)
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null)

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
    const sliceAngle = (2 * Math.PI) / MENU_ITEMS.length

    MENU_ITEMS.forEach((item, i) => {
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
      ctx.fillStyle = item.color === "#000000" ? "#FFFFFF" : "#FFFFFF"
      ctx.font = "bold 12px Arial"
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

    // Random spin between 2 and 5 full rotations plus a random segment
    const spinAngle = (2 + Math.random() * 3) * 2 * Math.PI
    const spinDuration = 3000 + Math.random() * 2000 // Between 3 and 5 seconds
    const startTime = Date.now()
    const startAngle = angle

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / spinDuration, 1)

      // Easing function for slowing down
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
      const currentRotation = startAngle + spinAngle * easeOut(progress)

      setAngle(currentRotation)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        // Determine selected item
        const normalizedAngle = currentRotation % (2 * Math.PI)
        const sliceAngle = (2 * Math.PI) / MENU_ITEMS.length
        const selectedIndex = MENU_ITEMS.length - 1 - (Math.floor(normalizedAngle / sliceAngle) % MENU_ITEMS.length)
        setSelectedItem(MENU_ITEMS[selectedIndex].name)
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
    <div className="flex flex-col items-center">
      <motion.div
        className="relative mb-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          className="rounded-full border-4 border-[#D4AF37] shadow-lg"
          style={{ filter: "drop-shadow(0 0 10px rgba(212, 175, 55, 0.5))" }}
        />
        <motion.div
          className="absolute -right-4 top-1/2 h-8 w-8 -translate-y-1/2 transform"
          animate={{ x: [0, 5, 0], scale: [1, 1.2, 1] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        >
          <div className="h-0 w-0 border-b-[15px] border-l-[25px] border-t-[15px] border-b-transparent border-l-[#E50000] border-t-transparent"></div>
        </motion.div>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mb-4">
        <Button
          onClick={spinWheel}
          disabled={spinning}
          className="relative overflow-hidden bg-[#D4AF37] px-8 py-2 text-lg font-bold text-black hover:bg-[#B8860B]"
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
            "¡Girar la Ruleta!"
          )}
          <motion.span
            className="absolute inset-0 z-0"
            initial={{ opacity: 0, scale: 0 }}
            animate={spinning ? { opacity: 1, scale: [1, 1.5, 1] } : { opacity: 0, scale: 0 }}
            transition={{ repeat: spinning ? Number.POSITIVE_INFINITY : 0, duration: 1 }}
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
            }}
          ></motion.span>
        </Button>
      </motion.div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-4 rounded-md bg-red-600 p-3 text-center text-white"
          >
            <motion.p
              initial={{ scale: 0.8 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5 }}
              className="text-sm"
            >
              ¡Tu comida es:
            </motion.p>
            <motion.p
              className="text-xl font-bold"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: 3, duration: 0.5 }}
            >
              {selectedItem}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
