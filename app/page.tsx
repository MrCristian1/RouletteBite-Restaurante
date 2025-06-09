"use client"

import { useRef } from "react"
import Link from "next/link"
import { ChevronRight, Clock, MapPin, Phone } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import RouletteWheel from "@/components/roulette-wheel"
import HowItWorks from "@/components/how-it-works"
import FeaturedItems from "@/components/featured-items"
import Testimonials from "@/components/testimonials"
import LocationSection from "@/components/location-section"
import ReservationSection from "@/components/reservation-section"
import DeliverySection from "@/components/delivery-section"

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section ref={targetRef} className="relative bg-black py-20 text-white">
          <div
            className="absolute inset-0 z-0 opacity-20"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1596731498067-8e0b6ff366cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <motion.div
            style={{ opacity, scale, y }}
            className="container relative z-10 mx-auto flex flex-col items-center px-4 text-center md:flex-row md:text-left lg:px-8"
          >
            <div className="mb-10 md:mb-0 md:w-1/2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-4 font-serif text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
              >
                <span className="text-red-600">Ruleta</span> de <span className="text-[#D4AF37]">Sabores</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-6 text-lg text-gray-300 md:pr-8"
              >
                ¡Apuesta por tu paladar! En RouletteBite, la emoción del casino se encuentra con la comida rápida. Gira
                la ruleta y descubre tu próxima comida favorita.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="#delivery"
                    className="inline-flex items-center justify-center rounded-md bg-red-600 px-6 py-3 text-base font-medium text-white shadow-lg transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Pedir Delivery
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="#reservaciones"
                    className="inline-flex items-center justify-center rounded-md border border-[#D4AF37] bg-transparent px-6 py-3 text-base font-medium text-[#D4AF37] shadow-lg transition-colors hover:bg-[#D4AF37]/10 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2"
                  >
                    Reservar Mesa <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
            <div className="md:w-1/2">
              <RouletteWheel />
            </div>
          </motion.div>
        </section>

        {/* Quick Info */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#D4AF37] py-6 text-black"
        >
          <div className="container mx-auto grid grid-cols-1 gap-4 px-4 md:grid-cols-3 lg:px-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center space-x-2 md:justify-start"
            >
              <Clock className="h-6 w-6" />
              <span className="text-sm font-medium md:text-base">Abierto: 11:00 AM - 11:00 PM</span>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center justify-center space-x-2">
              <Phone className="h-6 w-6" />
              <span className="text-sm font-medium md:text-base">Reservas: (123) 456-7890</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center space-x-2 md:justify-end"
            >
              <MapPin className="h-6 w-6" />
              <span className="text-sm font-medium md:text-base">Av. Casino Real 123, Ciudad</span>
            </motion.div>
          </div>
        </motion.section>

        {/* How It Works */}
        <section id="how-it-works" className="bg-white py-16">
          <HowItWorks />
        </section>

        {/* Featured Menu Items */}
        <section id="menu" className="bg-black py-16 text-white">
          <FeaturedItems />
        </section>

        {/* Location Section */}
        <LocationSection />

        {/* Delivery Section */}
        <DeliverySection />

        {/* Reservation Section */}
        <ReservationSection />

        {/* Testimonials */}
        <section className="bg-white py-16">
          <Testimonials />
        </section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden bg-red-600 py-16 text-white"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 10 }}
            className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-[#D4AF37]/20"
          ></motion.div>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -5, 5, 0],
            }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 15 }}
            className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-[#D4AF37]/20"
          ></motion.div>
          <div className="container relative z-10 mx-auto px-4 text-center lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-6 font-serif text-3xl font-bold md:text-4xl"
            >
              ¿Listo para probar tu suerte?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mb-8 max-w-2xl text-lg"
            >
              Visítanos hoy y deja que la ruleta decida tu próxima comida favorita. ¡La fortuna favorece a los
              hambrientos!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="#reservaciones"
                className="inline-flex items-center justify-center rounded-md border-2 border-white bg-transparent px-8 py-3 text-lg font-medium text-white shadow-lg transition-colors hover:bg-white hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-600"
              >
                Reservar Mesa
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  )
}
