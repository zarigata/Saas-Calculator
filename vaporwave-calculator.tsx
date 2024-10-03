"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Minus, Frown } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const BackgroundShape = ({ shape }: { shape: 'circle' | 'triangle' }) => {
  const size = Math.random() * 100 + 50
  const top = Math.random() * 100
  const left = Math.random() * 100
  const animationDuration = Math.random() * 20 + 10
  const glowColor = Math.random() > 0.5 ? '#00FFFF' : '#FF00FF'

  const shapeStyle = {
    position: 'fixed' as const,
    top: `${top}%`,
    left: `${left}%`,
    width: `${size}px`,
    height: `${size}px`,
    background: 'rgba(255, 255, 255, 0.1)',
    boxShadow: `0 0 20px ${glowColor}`,
    animation: `spin ${animationDuration}s linear infinite`,
    zIndex: -1,
  }

  if (shape === 'circle') {
    return <div style={{ ...shapeStyle, borderRadius: '50%' }} />
  } else {
    return (
      <div
        style={{
          ...shapeStyle,
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        }}
      />
    )
  }
}

export default function Component() {
  const [maxIncome, setMaxIncome] = useState(10000)
  const [developmentCost, setDevelopmentCost] = useState(2000)
  const [hardwareItems, setHardwareItems] = useState([{ name: 'Server', price: 1000 }])
  const [monthlyCost, setMonthlyCost] = useState(3000)
  const [operationalItems, setOperationalItems] = useState([{ name: 'Office Rent', price: 1500 }])
  const [taxRate, setTaxRate] = useState(20)
  const [backgroundShapes, setBackgroundShapes] = useState<JSX.Element[]>([])

  useEffect(() => {
    const shapes = []
    for (let i = 0; i < 10; i++) {
      shapes.push(<BackgroundShape key={i} shape={Math.random() > 0.5 ? 'circle' : 'triangle'} />)
    }
    setBackgroundShapes(shapes)
  }, [])

  const addHardwareItem = () => {
    setHardwareItems([...hardwareItems, { name: '', price: 0 }])
  }

  const removeHardwareItem = (index: number) => {
    setHardwareItems(hardwareItems.filter((_, i) => i !== index))
  }

  const updateHardwareItem = (index: number, field: 'name' | 'price', value: string) => {
    const newItems = [...hardwareItems]
    newItems[index][field] = field === 'price' ? Number(value) : value
    setHardwareItems(newItems)
  }

  const addOperationalItem = () => {
    setOperationalItems([...operationalItems, { name: '', price: 0 }])
  }

  const removeOperationalItem = (index: number) => {
    setOperationalItems(operationalItems.filter((_, i) => i !== index))
  }

  const updateOperationalItem = (index: number, field: 'name' | 'price', value: string) => {
    const newItems = [...operationalItems]
    newItems[index][field] = field === 'price' ? Number(value) : value
    setOperationalItems(newItems)
  }

  const hardwareCost = hardwareItems.reduce((sum, item) => sum + item.price, 0)
  const operationalCost = operationalItems.reduce((sum, item) => sum + item.price, 0)
  const totalCosts = developmentCost + hardwareCost + monthlyCost + operationalCost
  const taxes = totalCosts * (taxRate / 100)
  const totalWithTaxes = totalCosts + taxes
  const profitMargin = 0.2 // 20% profit

  const maxProfit = maxIncome - totalWithTaxes
  const minIncome = totalWithTaxes / (1 - profitMargin)
  const minProfit = minIncome * profitMargin

  const chartData = [
    { name: 'Max Scenario', Income: maxIncome, Costs: totalWithTaxes, Profit: maxProfit },
    { name: 'Min Scenario', Income: minIncome, Costs: totalWithTaxes, Profit: minProfit },
  ]

  return (
    <div className="container mx-auto p-4 bg-gradient-to-r from-cyan-400 to-purple-500 min-h-screen text-white relative overflow-hidden">
      {backgroundShapes}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

        body {
          background: linear-gradient(to right, #00FFFF, #FF00FF);
          font-family: 'VT323', monospace;
        }
        .vaporwave-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        }
        .vaporwave-input {
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
        }
        .vaporwave-button {
          background: linear-gradient(45deg, #FF00FF, #00FFFF);
          border: none;
          color: white;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .text-shadow-glow {
          text-shadow: 0 0 10px #00FFFF, 0 0 20px #00FFFF, 0 0 30px #00FFFF, 0 0 40px #FF00FF, 0 0 70px #FF00FF, 0 0 80px #FF00FF, 0 0 100px #FF00FF, 0 0 150px #FF00FF;
        }
      `}</style>
      <h1 className="text-4xl font-bold mb-4 text-center text-shadow-glow">V A P O R W A V E SaaS Calculator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card className="vaporwave-card">
          <CardHeader>
            <CardTitle className="text-2xl">Input Parameters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="maxIncome" className="text-white">Max Income</Label>
                <Input
                  id="maxIncome"
                  type="number"
                  value={maxIncome}
                  onChange={(e) => setMaxIncome(Number(e.target.value))}
                  className="vaporwave-input"
                />
              </div>
              <div>
                <Label htmlFor="developmentCost" className="text-white">Development Cost</Label>
                <Input
                  id="developmentCost"
                  type="number"
                  value={developmentCost}
                  onChange={(e) => setDevelopmentCost(Number(e.target.value))}
                  className="vaporwave-input"
                />
              </div>
              <div>
                <Label className="text-white">Hardware Costs</Label>
                {hardwareItems.map((item, index) => (
                  <div key={index} className="flex gap-2 mt-2">
                    <Input
                      placeholder="Item name"
                      value={item.name}
                      onChange={(e) => updateHardwareItem(index, 'name', e.target.value)}
                      className="vaporwave-input flex-grow"
                    />
                    <Input
                      type="number"
                      placeholder="Price"
                      value={item.price}
                      onChange={(e) => updateHardwareItem(index, 'price', e.target.value)}
                      className="vaporwave-input w-24"
                    />
                    <Button onClick={() => removeHardwareItem(index)} className="vaporwave-button"><Minus size={16} /></Button>
                  </div>
                ))}
                <Button onClick={addHardwareItem} className="vaporwave-button mt-2"><Plus size={16} /> Add Hardware</Button>
              </div>
              <div>
                <Label htmlFor="monthlyCost" className="text-white">Monthly Cost</Label>
                <Input
                  id="monthlyCost"
                  type="number"
                  value={monthlyCost}
                  onChange={(e) => setMonthlyCost(Number(e.target.value))}
                  className="vaporwave-input"
                />
              </div>
              <div>
                <Label className="text-white">Operational Costs</Label>
                {operationalItems.map((item, index) => (
                  <div key={index} className="flex gap-2 mt-2">
                    <Input
                      placeholder="Item name"
                      value={item.name}
                      onChange={(e) => updateOperationalItem(index, 'name', e.target.value)}
                      className="vaporwave-input flex-grow"
                    />
                    <Input
                      type="number"
                      placeholder="Price"
                      value={item.price}
                      onChange={(e) => updateOperationalItem(index, 'price', e.target.value)}
                      className="vaporwave-input w-24"
                    />
                    <Button onClick={() => removeOperationalItem(index)} className="vaporwave-button"><Minus size={16} /></Button>
                  </div>
                ))}
                <Button onClick={addOperationalItem} className="vaporwave-button mt-2"><Plus size={16} /> Add Operational Cost</Button>
              </div>
              <div>
                <Label htmlFor="taxRate" className="text-white">Tax Rate (%)</Label>
                <Input
                  id="taxRate"
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(Number(e.target.value))}
                  className="vaporwave-input"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="vaporwave-card">
          <CardHeader>
            <CardTitle className="text-2xl">Results</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Total Costs:</strong> ${totalCosts.toFixed(2)}</p>
            <p><strong>Taxes:</strong> ${taxes.toFixed(2)} <Frown className="inline-block ml-2 text-yellow-300" /></p>
            <p><strong>Total with Taxes:</strong> ${totalWithTaxes.toFixed(2)}</p>
            <p><strong>Max Profit (at max income):</strong> ${maxProfit.toFixed(2)}</p>
            <p><strong>Min Income (for 20% profit):</strong> ${minIncome.toFixed(2)}</p>
            <p><strong>Min Profit:</strong> ${minProfit.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>
      <Card className="vaporwave-card">
        <CardHeader>
          <CardTitle className="text-2xl">Profit Scenarios</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.3)" />
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none' }} />
              <Legend />
              <Bar dataKey="Income" fill="#00FFFF" />
              <Bar dataKey="Costs" fill="#FF00FF" />
              <Bar dataKey="Profit" fill="#FFFF00" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}