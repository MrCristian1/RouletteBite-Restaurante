"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, Users, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Definición de tipos para las mesas
type TableSize = "2" | "4" | "6" | "8"
type TableStatus = "available" | "selected" | "occupied"

interface Table {
  id: string
  size: TableSize
  status: TableStatus
  position: { x: number; y: number }
  rotation: number
}

export default function ReservationSection() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [people, setPeople] = useState("")
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [reservationComplete, setReservationComplete] = useState(false)

  // Datos de ejemplo para las mesas
  const tables: Table[] = [
    { id: "table1", size: "2", status: "available", position: { x: 20, y: 30 }, rotation: 0 },
    { id: "table2", size: "2", status: "available", position: { x: 80, y: 30 }, rotation: 0 },
    { id: "table3", size: "4", status: "available", position: { x: 150, y: 40 }, rotation: 45 },
    { id: "table4", size: "4", status: "occupied", position: { x: 220, y: 40 }, rotation: 45 },
    { id: "table5", size: "6", status: "available", position: { x: 50, y: 120 }, rotation: 0 },
    { id: "table6", size: "8", status: "available", position: { x: 180, y: 130 }, rotation: 0 },
    { id: "table7", size: "2", status: "available", position: { x: 280, y: 120 }, rotation: 90 },
    { id: "table8", size: "4", status: "available", position: { x: 350, y: 50 }, rotation: 0 },
    { id: "table9", size: "4", status: "occupied", position: { x: 350, y: 130 }, rotation: 0 },
  ]

  const handleTableSelect = (tableId: string) => {
    const table = tables.find((t) => t.id === tableId)
    if (table && table.status !== "occupied") {
      setSelectedTable(selectedTable === tableId ? null : tableId)
    }
  }

  const handleNextStep = () => {
    if (step === 1 && date && time && people) {
      setStep(2)
    } else if (step === 2 && selectedTable) {
      setStep(3)
    } else if (step === 3) {
      setReservationComplete(true)
      // Aquí iría la lógica para enviar la reserva
    }
  }

  const handlePrevStep = () => {
    if (step === 2) {
      setStep(1)
    } else if (step === 3) {
      setStep(2)
    }
  }

  const getTableColor = (status: TableStatus, isSelected: boolean) => {
    if (status === "occupied") return "#777777"
    if (isSelected) return "#D4AF37"
    return "#E50000"
  }

  const getTableSize = (size: TableSize) => {
    switch (size) {
      case "2":
        return { width: 40, height: 40 }
      case "4":
        return { width: 50, height: 50 }
      case "6":
        return { width: 70, height: 50 }
      case "8":
        return { width: 90, height: 60 }
    }
  }

  return (
    <section id="reservaciones" className="bg-white py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-2 font-serif text-3xl font-bold text-black md:text-4xl">Reserva Tu Mesa</h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "5rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto h-1 bg-[#D4AF37]"
          ></motion.div>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Asegura tu lugar en RouletteBite y prepárate para una experiencia gastronómica única.
          </p>
        </motion.div>

        <div className="mx-auto max-w-4xl">
          {/* Indicador de pasos */}
          <div className="mb-8 flex justify-center">
            <div className="relative flex w-full max-w-md items-center justify-between">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="z-10 flex flex-col items-center">
                  <motion.div
                    animate={{
                      scale: step >= stepNumber ? 1 : 0.8,
                      backgroundColor: step >= stepNumber ? "#D4AF37" : "#E5E7EB",
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-white"
                  >
                    {step > stepNumber ? <Check className="h-5 w-5" /> : <span>{stepNumber}</span>}
                  </motion.div>
                  <span className="mt-2 text-xs font-medium">
                    {stepNumber === 1 ? "Detalles" : stepNumber === 2 ? "Seleccionar Mesa" : "Confirmar"}
                  </span>
                </div>
              ))}
              <div className="absolute left-0 top-5 z-0 h-0.5 w-full bg-gray-200">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${(step - 1) * 50}%` }}
                  className="h-full bg-[#D4AF37]"
                ></motion.div>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {reservationComplete ? (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="rounded-lg bg-green-50 p-8 text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="mb-2 text-2xl font-bold text-green-800">¡Reserva Confirmada!</h3>
                <p className="mb-6 text-green-700">
                  Tu mesa ha sido reservada exitosamente. Te esperamos el {date} a las {time}.
                </p>
                <Button
                  onClick={() => {
                    setReservationComplete(false)
                    setStep(1)
                    setDate("")
                    setTime("")
                    setPeople("")
                    setSelectedTable(null)
                  }}
                  className="bg-[#D4AF37] text-black hover:bg-[#B8860B]"
                >
                  Hacer otra reserva
                </Button>
              </motion.div>
            ) : (
              <>
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <Card className="border-[#D4AF37]">
                      <CardContent className="p-6">
                        <h3 className="mb-6 text-xl font-bold">Detalles de la Reserva</h3>

                        <div className="mb-6 grid gap-6 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="date">Fecha</Label>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                              <Input
                                id="date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="pl-10"
                                min={new Date().toISOString().split("T")[0]}
                                required
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="time">Hora</Label>
                            <div className="relative">
                              <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                              <Select value={time} onValueChange={setTime} required>
                                <SelectTrigger className="pl-10">
                                  <SelectValue placeholder="Selecciona una hora" />
                                </SelectTrigger>
                                <SelectContent>
                                  {[
                                    "12:00",
                                    "12:30",
                                    "13:00",
                                    "13:30",
                                    "14:00",
                                    "14:30",
                                    "19:00",
                                    "19:30",
                                    "20:00",
                                    "20:30",
                                    "21:00",
                                    "21:30",
                                  ].map((t) => (
                                    <SelectItem key={t} value={t}>
                                      {t}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>

                        <div className="mb-8 space-y-2">
                          <Label>Número de Personas</Label>
                          <div className="relative">
                            <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <RadioGroup
                              value={people}
                              onValueChange={setPeople}
                              className="grid grid-cols-4 gap-2 pl-10 sm:grid-cols-4"
                            >
                              {["1", "2", "4", "6+"].map((num) => (
                                <div key={num}>
                                  <RadioGroupItem value={num} id={`people-${num}`} className="peer sr-only" />
                                  <Label
                                    htmlFor={`people-${num}`}
                                    className="flex cursor-pointer items-center justify-center rounded-md border border-gray-200 px-3 py-2 text-center peer-checked:border-[#D4AF37] peer-checked:bg-[#D4AF37]/10 peer-checked:text-[#D4AF37] peer-data-[state=checked]:border-[#D4AF37]"
                                  >
                                    {num}
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <Button
                            onClick={handleNextStep}
                            disabled={!date || !time || !people}
                            className="bg-[#D4AF37] text-black hover:bg-[#B8860B]"
                          >
                            Continuar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <Card className="border-[#D4AF37]">
                      <CardContent className="p-6">
                        <h3 className="mb-6 text-xl font-bold">Selecciona tu Mesa</h3>

                        <div className="mb-4 flex items-center justify-center space-x-6">
                          <div className="flex items-center">
                            <div className="mr-2 h-4 w-4 rounded-full bg-[#E50000]"></div>
                            <span className="text-sm">Disponible</span>
                          </div>
                          <div className="flex items-center">
                            <div className="mr-2 h-4 w-4 rounded-full bg-[#D4AF37]"></div>
                            <span className="text-sm">Seleccionada</span>
                          </div>
                          <div className="flex items-center">
                            <div className="mr-2 h-4 w-4 rounded-full bg-[#777777]"></div>
                            <span className="text-sm">Ocupada</span>
                          </div>
                        </div>

                        <div className="relative mx-auto mb-6 h-[300px] w-full max-w-[500px] overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                          {/* Área de entrada */}
                          <div className="absolute left-1/2 top-0 h-8 w-16 -translate-x-1/2 bg-gray-300 text-center text-xs leading-8">
                            Entrada
                          </div>

                          {/* Mesas */}
                          {tables.map((table) => {
                            const { width, height } = getTableSize(table.size)
                            const isSelected = selectedTable === table.id
                            return (
                              <motion.div
                                key={table.id}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                  opacity: 1,
                                  scale: 1,
                                  x: table.position.x,
                                  y: table.position.y,
                                  rotate: table.rotation,
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                whileHover={{ scale: table.status !== "occupied" ? 1.1 : 1 }}
                                whileTap={{ scale: table.status !== "occupied" ? 0.95 : 1 }}
                                onClick={() => handleTableSelect(table.id)}
                                style={{
                                  width,
                                  height,
                                  position: "absolute",
                                  borderRadius: "4px",
                                  backgroundColor: getTableColor(table.status, isSelected),
                                  cursor: table.status === "occupied" ? "not-allowed" : "pointer",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  color: "white",
                                  fontSize: "12px",
                                  fontWeight: "bold",
                                  boxShadow: isSelected ? "0 0 0 3px white, 0 0 0 5px #D4AF37" : "none",
                                }}
                              >
                                {table.size}
                              </motion.div>
                            )
                          })}
                        </div>

                        {selectedTable && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 rounded-md bg-[#D4AF37]/10 p-3 text-center"
                          >
                            <p className="text-sm font-medium">
                              Mesa seleccionada: {selectedTable.replace("table", "")} (Para{" "}
                              {tables.find((t) => t.id === selectedTable)?.size} personas)
                            </p>
                          </motion.div>
                        )}

                        <div className="flex justify-between">
                          <Button variant="outline" onClick={handlePrevStep}>
                            Atrás
                          </Button>
                          <Button
                            onClick={handleNextStep}
                            disabled={!selectedTable}
                            className="bg-[#D4AF37] text-black hover:bg-[#B8860B]"
                          >
                            Continuar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <Card className="border-[#D4AF37]">
                      <CardContent className="p-6">
                        <h3 className="mb-6 text-xl font-bold">Confirma tu Reserva</h3>

                        <div className="mb-8 space-y-4 rounded-md bg-gray-50 p-4">
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="font-medium">Fecha:</span>
                            <span>{date}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="font-medium">Hora:</span>
                            <span>{time}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="font-medium">Personas:</span>
                            <span>{people}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Mesa:</span>
                            <span>Mesa {selectedTable?.replace("table", "")}</span>
                          </div>
                        </div>

                        <div className="mb-6 space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Nombre</Label>
                            <Input id="name" placeholder="Tu nombre completo" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="tu@email.com" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Teléfono</Label>
                            <Input id="phone" placeholder="Tu número de teléfono" required />
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <Button variant="outline" onClick={handlePrevStep}>
                            Atrás
                          </Button>
                          <Button onClick={handleNextStep} className="bg-[#D4AF37] text-black hover:bg-[#B8860B]">
                            Confirmar Reserva
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
