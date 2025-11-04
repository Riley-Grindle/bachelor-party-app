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
          <h2 className="text-5xl md:text-6xl font-bold text-white 
mb-4">SCHEDULE</h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Your weekend itinerary</p>
        </div>

        {/* Itinerary Timeline */}
        <div className="space-y-6">
          {itinerary.map((day, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-r from-green-900/40 via-black/60 
to-green-900/40 backdrop-blur-md rounded-2xl border border-green-700/30 
overflow-hidden hover:border-yellow-500/50 transition-all duration-300 
group"
            >
              {/* Day Header */}
              <div className="bg-gradient-to-r from-yellow-600 
to-yellow-500 px-8 py-5 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold 
text-black">
                    {day.day}
                  </h3>
                  {day.date && (
                    <p className="text-black/80 font-semibold text-sm 
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
                        <div className="w-3 h-3 bg-yellow-500 rounded-full 
group-hover/item:scale-150 transition-transform duration-300"></div>
                        {itemIdx < day.items.length - 1 && (
                          <div className="absolute top-3 left-1/2 w-0.5 
h-10 bg-green-700/30 -translate-x-1/2"></div>
                        )}
                      </div>

                      {/* Event Details */}
                      <div className="flex-1">
                        <p className="text-gray-300 text-base md:text-lg 
group-hover/item:text-white transition-colors leading-relaxed">
                          {item}
                        </p>
                      </div>

                      {/* Time Icon (if event contains time) */}
                      {/\d+:\d+\s*(AM|PM|am|pm)/.test(item) && (
                        <Clock className="w-5 h-5 text-yellow-500/60 
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
          <div className="mt-12 bg-gradient-to-br from-yellow-600/20 
to-green-900/20 backdrop-blur-md rounded-2xl border border-yellow-500/30 
p-8">
            <h3 className="text-2xl font-bold text-white mb-4 flex 
items-center">
              <Clock className="w-6 h-6 text-yellow-500 mr-3" />
              Important Notes
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="text-yellow-500 mr-3">•</span>
                <span>All times are local (Eastern Time)</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-3">•</span>
                <span>Tee times are weather dependent and may be 
adjusted</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-3">•</span>
                <span>Golf attire required on course (collared shirts, no 
denim)</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-3">•</span>
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
            <p className="text-gray-400 text-lg">Loading schedule...</p>
          </div>
        )}
      </div>
    </div>
  )
}
