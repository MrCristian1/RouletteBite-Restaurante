"use client"

import { useState } from "react"
import { MapPin, Phone, Clock, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export default function LocationSection() {
  const [mapLoaded, setMapLoaded] = useState(false)

  const scheduleItems = [
    { days: "Lunes - Jueves", hours: "11:00 AM - 10:00 PM" },
    { days: "Viernes - Sábado", hours: "11:00 AM - 12:00 AM" },
    { days: "Domingo", hours: "12:00 PM - 9:00 PM" },
  ]

  return (
    <section id="ubicación" className="bg-black py-16 text-white">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-2 font-serif text-3xl font-bold text-white md:text-4xl">Nuestra Ubicación</h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "5rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto h-1 bg-[#D4AF37]"
          ></motion.div>
          <p className="mx-auto mt-4 max-w-2xl text-gray-300">
            Visítanos y vive la experiencia RouletteBite en persona. Estamos ubicados en una zona céntrica de fácil
            acceso.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Mapa */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[400px] overflow-hidden rounded-xl lg:col-span-3"
          >
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
              {!mapLoaded && (
                <div className="flex flex-col items-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#D4AF37] border-t-transparent"></div>
                  <p className="mt-2 text-white">Cargando mapa...</p>
                </div>
              )}
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d-79.9195441!3d9.0009558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8faca8f1fbe3d573%3A0x5e85b5553b4c236c!2sCasco%20Viejo%2C%20Panama%20City%2C%20Panama!5e0!3m2!1sen!2sus!4v1621436361218!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              className={`absolute inset-0 z-0 ${mapLoaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setMapLoaded(true)}
            ></iframe>
            <div className="absolute bottom-4 right-4 z-20">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://goo.gl/maps/1J9EYmgugF7XzVQS6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center rounded-md bg-[#D4AF37] px-3 py-2 text-sm font-medium text-black shadow-lg transition-colors hover:bg-[#B8860B]"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Ver en Google Maps
              </motion.a>
            </div>
          </motion.div>

          {/* Información de contacto */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="h-full border-[#D4AF37] bg-gray-900">
              <CardContent className="p-6">
                <h3 className="mb-6 font-serif text-2xl font-bold text-[#D4AF37]">Información de Contacto</h3>

                <div className="mb-6 flex items-start space-x-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-600">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-medium text-white">Dirección</h4>
                    <p className="text-gray-300">Av. Casino Real 123, Ciudad, CP 12345</p>
                    <p className="mt-1 text-sm text-gray-400">A 5 minutos del centro comercial</p>
                  </div>
                </div>

                <div className="mb-6 flex items-start space-x-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-600">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-medium text-white">Reservaciones</h4>
                    <p className="text-gray-300">(123) 456-7890</p>
                    <p className="mt-1 text-sm text-gray-400">Recomendamos reservar con anticipación</p>
                  </div>
                </div>

                <div>
                  <div className="mb-4 flex items-start space-x-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-600">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="mb-1 font-medium text-white">Horario de Atención</h4>
                    </div>
                  </div>

                  <div className="ml-14 space-y-2">
                    {scheduleItems.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                        className="flex justify-between border-b border-gray-700 pb-2"
                      >
                        <span className="text-gray-300">{item.days}:</span>
                        <span className="font-medium text-[#D4AF37]">{item.hours}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
