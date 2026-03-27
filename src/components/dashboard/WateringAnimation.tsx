'use client'

import React, { useEffect, useState } from 'react'
import { Droplets } from 'lucide-react'

interface WateringAnimationProps {
  isActive: boolean
}

export function WateringAnimation({ isActive }: WateringAnimationProps) {
  const [drops, setDrops] = useState<Array<{ id: number; x: number; delay: number }>>([])

  useEffect(() => {
    if (isActive) {
      // Generate water drops
      const newDrops = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2
      }))
      setDrops(newDrops)
    } else {
      setDrops([])
    }
  }, [isActive])

  if (!isActive) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="absolute animate-water-drop"
          style={{
            left: `${drop.x}%`,
            top: '-20px',
            animationDelay: `${drop.delay}s`
          }}
        >
          <Droplets className="w-4 h-4 text-blue-500 opacity-60" />
        </div>
      ))}
      <style jsx>{`
        @keyframes water-drop {
          0% {
            transform: translateY(0);
            opacity: 0.6;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        .animate-water-drop {
          animation: water-drop 2s ease-in infinite;
        }
      `}</style>
    </div>
  )
}
