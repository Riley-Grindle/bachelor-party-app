import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { ref, onValue } from 'firebase/database'
import { Calendar, Clock } from 'lucide-react'

export default function Itinerary() {
  const [itinerary, setItinerary] = useState([])

  useEffect(() => {
    const iRef = ref(db, '/itinerary')
    onValue(iRef, snap => setItinerary(snap.val() || []))
  }, [])

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-accent-light 
mb-4">SCHEDULE</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-accent text-lg">Your weekend itinerary</p>
        </div>

        {/* Itinerary Timeline */}
        <div className="space-y-6">
          {itinerary.map((day, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-r from-secondary-dark/40 via-white/70 
to-secondary-dark/40 backdrop-blur-md rounded-2xl border border-secondary/30 
overflow-hidden hover:border-primary/50 transition-all duration-300 
group"
            >
              {/* Day Header */}
              <div className="bg-gradient-to-r from-primary-dark 
to-primary-light px-8 py-5 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold 
text-white">
                    {day.day}
                  </h3>
                  {day.date && (
                    <p className="text-white/80 font-semibold text-sm 
md:text-base">
                      {day.date}
                    </p>
                  )}
                </div>
                <Calendar className="w-8 h-8 text-black/70" />
              </div>

              {/* Events List */}
              <div className="p-8">
                <div className="space-y-5">
                  {day.items && day.items.map((item, itemIdx) => (
                    <div 
                      key={itemIdx} 
                      className="flex items-start space-x-4 group/item 
hover:translate-x-2 transition-transform duration-200"
                    >
                      {/* Timeline Dot */}
                      <div className="relative flex-shrink-0 mt-2">
                        <div className="w-3 h-3 bg-primary rounded-full 
group-hover/item:scale-150 transition-transform duration-300"></div>
                        {itemIdx < day.items.length - 1 && (
                          <div className="absolute top-3 left-1/2 w-0.5 
h-10 bg-secondary/30 -translate-x-1/2"></div>
                        )}
                      </div>

                      {/* Event Details */}
                      <div className="flex-1">
                        <p className="text-gray-700 text-base md:text-lg 
group-hover/item:text-gray-900 transition-colors leading-relaxed">
                          {item}
                        </p>
                      </div>

                      {/* Time Icon (if event contains time) */}
                      {/\d+:\d+\s*(AM|PM|am|pm)/.test(item) && (
                        <Clock className="w-5 h-5 text-primary/60 
flex-shrink-0 mt-1" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Reference Card */}
        {itinerary.length > 0 && (
          <div className="mt-12 bg-gradient-to-br from-primary-dark/20 
to-secondary-dark/20 backdrop-blur-md rounded-2xl border border-primary/30 
p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex 
items-center">
              <Clock className="w-6 h-6 text-primary mr-3" />
              Important Notes
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>All times are local (Eastern Time)</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>Tee times are weather dependent and may be 
adjusted</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>Golf attire required on course (collared shirts, no 
denim)</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>Transportation provided for all scheduled 
events</span>
              </li>
            </ul>
          </div>
        )}

        {/* Empty State */}
        {itinerary.length === 0 && (
          <div className="text-center py-20">
            <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Loading schedule...</p>
          </div>
        )}
      </div>
    </div>
  )
}
