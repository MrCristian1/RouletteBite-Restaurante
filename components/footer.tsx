"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"
import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="mb-4 flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-[#D4AF37]"
              >
                <div
                  className="absolute inset-0 bg-red-600"
                  style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }}
                ></div>
                <div
                  className="absolute inset-0 bg-black"
                  style={{ clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)" }}
                ></div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                  className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]"
                ></motion.div>
              </motion.div>
              <span className="font-serif text-xl font-bold">
                <span className="text-red-600">Roulette</span>
                <span className="text-[#D4AF37]">Bite</span>
              </span>
            </Link>
            <p className="mb-4 text-gray-400">
              Donde la emoción del casino se encuentra con la comida rápida. Una experiencia gastronómica única llena de
              sorpresas.
            </p>
            <div className="flex space-x-4">
              <motion.div whileHover={{ y: -5, scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Link href="#" className="text-gray-400 transition-colors hover:text-[#D4AF37]">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -5, scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Link href="#" className="text-gray-400 transition-colors hover:text-[#D4AF37]">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -5, scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Link href="#" className="text-gray-400 transition-colors hover:text-[#D4AF37]">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="mb-4 text-lg font-bold">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {["Inicio", "Menú", "Cómo Funciona", "Reservaciones", "Eventos Especiales", "Sobre Nosotros"].map(
                (item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <Link
                      href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-gray-400 transition-colors hover:text-[#D4AF37]"
                    >
                      {item}
                    </Link>
                  </motion.li>
                ),
              )}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="mb-4 text-lg font-bold">Contacto</h3>
            <ul className="space-y-3">
              <motion.li whileHover={{ x: 5 }} className="flex items-start space-x-3">
                <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-[#D4AF37]" />
                <span className="text-gray-400">Av. Casino Real 123, Ciudad, CP 12345</span>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="flex items-center space-x-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-[#D4AF37]" />
                <span className="text-gray-400">(123) 456-7890</span>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="flex items-center space-x-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-[#D4AF37]" />
                <span className="text-gray-400">info@roulettebite.com</span>
              </motion.li>
            </ul>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="mb-4 text-lg font-bold">Horario</h3>
            <ul className="space-y-2">
              <motion.li whileHover={{ x: 5 }} className="flex justify-between">
                <span className="text-gray-400">Lunes - Jueves:</span>
                <span className="text-gray-400">11:00 AM - 10:00 PM</span>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="flex justify-between">
                <span className="text-gray-400">Viernes - Sábado:</span>
                <span className="text-gray-400">11:00 AM - 12:00 AM</span>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="flex justify-between">
                <span className="text-gray-400">Domingo:</span>
                <span className="text-gray-400">12:00 PM - 9:00 PM</span>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 border-t border-gray-800 pt-8 text-center"
        >
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} RouletteBite. Todos los derechos reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
