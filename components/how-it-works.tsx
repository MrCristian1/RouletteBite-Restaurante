"use client"

import { Dices, Utensils, Award } from "lucide-react"
import { motion } from "framer-motion"

export default function HowItWorks() {
  const steps = [
    {
      icon: <Dices className="h-12 w-12 text-red-600" />,
      title: "Gira la Ruleta",
      description: "Elige girar nuestra ruleta especial y deja que el azar decida tu próxima comida.",
      image:
        "https://www.jujuydice.com.ar/public/images/noticias/55518-cinco-trucos-para-ganar-la-ruleta-on-line.jpg",
    },
    {
      icon: <Utensils className="h-12 w-12 text-red-600" />,
      title: "Disfruta la Sorpresa",
      description: "Nuestros chefs prepararán la deliciosa comida que la ruleta ha seleccionado para ti.",
      image:
        "https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: <Award className="h-12 w-12 text-red-600" />,
      title: "Gana Premios",
      description: "Algunos giros te pueden dar premios especiales, descuentos o comidas gratis.",
      image:
        "https://images.unsplash.com/photo-1607344645866-009c320b63e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
  ]

  return (
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h2 className="mb-2 font-serif text-3xl font-bold text-black md:text-4xl">Cómo Funciona</h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "5rem" }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto h-1 bg-[#D4AF37]"
        ></motion.div>
        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          En RouletteBite, convertimos la elección de comida en una experiencia emocionante de casino.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ y: -10 }}
            className="flex flex-col items-center rounded-lg p-6 text-center"
          >
            <div className="relative mb-6 h-40 w-full overflow-hidden rounded-lg">
              <img
                src={step.image || "/placeholder.svg"}
                alt={step.title}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black shadow-lg">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5, ease: "easeInOut" }}
                >
                  {step.icon}
                </motion.div>
              </div>
            </div>
            <h3 className="mb-2 font-serif text-xl font-bold">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
            <motion.div
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#D4AF37] text-black"
            >
              {index + 1}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
