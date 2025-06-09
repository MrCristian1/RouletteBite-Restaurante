"use client"

import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

const testimonials = [
  {
    name: "Carlos Mendoza",
    comment:
      "¡La experiencia más divertida que he tenido en un restaurante! La ruleta me dio una hamburguesa increíble que nunca hubiera pedido por mi cuenta.",
    rating: 5,
    date: "15/04/2023",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "María Fernández",
    comment:
      "Me encanta la emoción de no saber qué voy a comer. ¡Y todo está delicioso! Vengo cada semana con mis amigos para probar suerte.",
    rating: 5,
    date: "22/05/2023",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Javier López",
    comment:
      "Al principio estaba escéptico, pero la comida es de primera calidad y el concepto es muy original. ¡Definitivamente volveré!",
    rating: 4,
    date: "10/06/2023",
    image: "https://randomuser.me/api/portraits/men/62.jpg",
  },
]

export default function Testimonials() {
  return (
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h2 className="mb-2 font-serif text-3xl font-bold text-black md:text-4xl">Lo Que Dicen Nuestros Clientes</h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "5rem" }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto h-1 bg-[#D4AF37]"
        ></motion.div>
        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          Descubre por qué nuestros clientes aman la experiencia RouletteBite.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full border-[#D4AF37] shadow-md transition-transform duration-300 hover:shadow-xl">
              <CardContent className="p-6">
                <div className="mb-4 flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * i, duration: 0.3 }}
                    >
                      <Star
                        className={`h-5 w-5 ${
                          i < testimonial.rating ? "fill-[#D4AF37] text-[#D4AF37]" : "text-gray-300"
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>
                <p className="mb-4 text-gray-700">"{testimonial.comment}"</p>
                <div className="flex items-center">
                  <div className="mr-3 h-12 w-12 overflow-hidden rounded-full">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="block font-medium">{testimonial.name}</span>
                    <span className="text-sm text-gray-500">{testimonial.date}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
