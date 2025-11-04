import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { ref, onValue } from 'firebase/database'
import { MapPin, Home } from 'lucide-react'

export default function Resort() {
  const [resort, setResort] = useState([])

  useEffect(() => {
    const rRef = ref(db, '/resort')
    onValue(rRef, snap => setResort(snap.val() || []))
  }, [])

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white 
mb-4">THE VENUE</h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Your home away from 
home</p>
        </div>

        {/* Resort Hero - First item as featured */}
        {resort.length > 0 && resort[0] && (
          <div className="relative h-96 rounded-3xl overflow-hidden mb-12 
group">
            {resort[0].img ? (
              <img
                src={resort[0].img}
                alt={resort[0].title}
                className="w-full h-full object-cover 
group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br 
from-green-900/60 to-gray-900 flex items-center justify-center">
                <Home className="w-24 h-24 text-green-700" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black 
via-black/50 to-transparent flex items-end">
              <div className="p-8 w-full">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-4xl font-bold text-white 
mb-2">{resort[0].title}</h3>
                    <p className="text-yellow-500 
text-xl">{resort[0].desc}</p>
                  </div>
                  <MapPin className="w-8 h-8 text-yellow-500 
flex-shrink-0" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Additional Resort Features Grid */}
        {resort.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
gap-8 mb-12">
            {resort.slice(1).map((r, i) => (
              <div 
                key={i} 
                className="group relative h-80 rounded-2xl overflow-hidden 
cursor-pointer border border-green-700/30 hover:border-yellow-500/50 
transition-all duration-300"
              >
                {r.img ? (
                  <img
                    src={r.img}
                    alt={r.title}
                    className="w-full h-full object-cover 
group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br 
from-green-900/40 to-gray-900/60 flex items-center justify-center">
                    <Home className="w-16 h-16 text-green-700" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t 
from-black via-black/60 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-2xl font-bold text-white mb-2 
group-hover:text-yellow-500 transition-colors">
                    {r.title}
                  </h4>
                  <p className="text-gray-300 group-hover:text-white 
transition-colors">
                    {r.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Amenities & Info Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Accommodations */}
          <div className="bg-gradient-to-br from-green-900/40 to-black/60 
backdrop-blur-md rounded-2xl border border-green-700/30 p-8">
            <h3 className="text-3xl font-bold text-white mb-6 flex 
items-center">
              <Home className="w-8 h-8 text-yellow-500 mr-3" />
              Accommodations
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-yellow-500 mr-3">•</span>
                <span>Shared villa accommodations</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-3">•</span>
                <span>Private bedrooms with ensuite baths</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-3">•</span>
                <span>Common areas for group gatherings</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-3">•</span>
                <span>Full kitchen and outdoor patio</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-3">•</span>
                <span>Pool and hot tub access</span>
              </li>
            </ul>
          </div>

          {/* Check-in Info */}
          <div className="bg-gradient-to-br from-green-900/40 to-black/60 
backdrop-blur-md rounded-2xl border border-green-700/30 p-8">
            <h3 className="text-3xl font-bold text-white mb-6 flex 
items-center">
              <MapPin className="w-8 h-8 text-yellow-500 mr-3" />
              Check-in Details
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-yellow-500 mr-3">•</span>
                <span><strong className="text-white">Check-in:</strong> 
Friday 4:00 PM</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-3">•</span>
                <span><strong className="text-white">Check-out:</strong> 
Sunday 11:00 AM</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-3">•</span>
                <span>Parking available on-site</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-3">•</span>
                <span>Golf course shuttle service</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-3">•</span>
                <span>24/7 concierge assistance</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Empty State */}
        {resort.length === 0 && (
          <div className="text-center py-20">
            <Home className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Loading resort 
information...</p>
          </div>
        )}
      </div>
    </div>
  )
}
