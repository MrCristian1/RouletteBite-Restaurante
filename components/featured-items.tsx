"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

const menuItems = [
  {
    name: "Royal Flush Burger",
    description:
      "Hamburguesa premium con ingredientes de lujo: carne Angus, queso cheddar, bacon ahumado, cebolla caramelizada y salsa especial.",
    price: "$12.99",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
  },
  {
    name: "Pizza Ruleta",
    description: "Pizza dividida en 8 secciones, cada una con un sabor diferente. ¡Cada mordisco es una sorpresa!",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: "$15.99",
    badge: "Favorito",
  },
  {
    name: "Jackpot Nachos",
    description:
      "Montaña de nachos cargados con queso, guacamole, jalapeños, carne y frijoles. ¡Un premio para compartir!",
    price: "$10.99",
    image:
      "https://images.unsplash.com/photo-1582169296194-e4d644c48063?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    badge: null,
  },
  {
    name: "Lucky 6 Combo",
    description:
      "6 delicias en un solo plato: alitas, aros de cebolla, papas fritas, nuggets, palitos de mozzarella y dip.",
    price: "$18.99",
    image:
      "https://us.123rf.com/450wm/kovalnadiya/kovalnadiya2201/kovalnadiya220100523/192887001-quite-la-comida-palitos-de-mozzarella-aros-de-cebolla-papas-fritas-nuggets-de-pollo-y-salsa-en.jpg?ver=6",
    badge: "Nuevo",
  },
  {
    name: "High Roller Hot Dog",
    description: "Hot dog gourmet con salchicha premium, chili con carne, queso derretido y toppings de lujo.",
    price: "$9.99",
    image:
      "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    badge: null,
  },
  {
    name: "Full House Wrap",
    description: "Wrap completo con pollo a la parrilla, verduras frescas, aguacate y aderezo especial de la casa.",
    price: "$11.99",
    image:
      "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    badge: null,
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
}

export default function FeaturedItems() {
  return (
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h2 className="mb-2 font-serif text-3xl font-bold text-white md:text-4xl">Nuestro Menú Destacado</h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "5rem" }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto h-1 bg-[#D4AF37]"
        ></motion.div>
        <p className="mx-auto mt-4 max-w-2xl text-gray-300">
          Estos son algunos de nuestros platos más populares, pero recuerda que puedes dejar que la ruleta decida por
          ti.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {menuItems.map((item, index) => (
          <MenuItem key={index} item={item} index={index} />
        ))}
      </motion.div>
    </div>
  )
}

function MenuItem({ item, index }: { item: any; index: number }) {
  return (
    <motion.div variants={item}>
      <Card className="group overflow-hidden border-[#D4AF37] bg-gray-900 text-white">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {item.badge && <Badge className="absolute right-2 top-2 bg-red-600 text-white">{item.badge}</Badge>}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        </div>
        <CardContent className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold">{item.name}</h3>
            <motion.span
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              className="text-lg font-bold text-[#D4AF37]"
            >
              {item.price}
            </motion.span>
          </div>
          <p className="text-sm text-gray-300">{item.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
