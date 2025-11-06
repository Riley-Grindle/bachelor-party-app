import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { ref, onValue } from 'firebase/database'
import { MapPin, Home, Navigation } from 'lucide-react'

export default function Stay() {
  const [stay, setStay] = useState([])

  useEffect(() => {
    const rRef = ref(db, '/stay')
    onValue(rRef, snap => setStay(snap.val() || []))
  }, [])

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-primary-light mb-4">THE VENUE</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-4"></div>
          <p className="text-primary text-lg">Your home away from home</p>
        </div>

        {/* Stay Hero - First item as featured */}
        {stay.length > 0 && stay[0] && (
          <div className="relative h-96 rounded-3xl overflow-hidden mb-12 group">
            {stay[0].img ? (
              <img
                src={stay[0].img}
                alt={stay[0].title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-secondary-dark/60 to-gray-900 flex items-center justify-center">
                <Home className="w-24 h-24 text-secondary" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-white/60 to-transparent flex items-end">
              <div className="p-8 w-full">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-4xl font-bold text-gray-900 mb-2">{stay[0].title}</h3>
                    <p className="text-primary text-xl">{stay[0].desc}</p>
                  </div>
                  <MapPin className="w-8 h-8 text-primary flex-shrink-0" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Additional Stay Features Grid */}
        {stay.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {stay.slice(1).map((r, i) => (
              <div 
                key={i} 
                className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer border border-secondary/30 hover:border-primary/50 transition-all 
duration-300"
              >
                {r.img ? (
                  <img
                    src={r.img}
                    alt={r.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-secondary-dark/40 to-gray-900/60 flex items-center justify-center">
                    <Home className="w-16 h-16 text-secondary" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-white/70 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {r.title}
                  </h4>
                  <p className="text-gray-700 group-hover:text-gray-900 transition-colors">
                    {r.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4-Panel Grid: Accommodations, Check-in, Hotel Image, Map */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Accommodations */}
          <div className="bg-gradient-to-br from-secondary-dark/40 to-white/80 backdrop-blur-md rounded-2xl border border-secondary/30 p-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Home className="w-8 h-8 text-primary mr-3" />
              Accommodations
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>4 Bedrooms Holding 4 Guests Each</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>1 King Bed, 1 Sofa Bed, 1 Air Mattress</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>Free On-Site Breakfast</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>20 Minute Drive to Fenway</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>9 Minute Drive to Downtown Boston</span>
              </li>
            </ul>
          </div>

          {/* Check-in Info */}
          <div className="bg-gradient-to-br from-secondary-dark/40 to-white/80 backdrop-blur-md rounded-2xl border border-secondary/30 p-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <MapPin className="w-8 h-8 text-primary mr-3" />
              Check-in Details
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span><strong className="text-gray-900">Check-in:</strong> Friday 4:00 PM</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span><strong className="text-gray-900">Check-out:</strong> Sunday 11:00 AM</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>Parking available on-site</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">•</span>
                <span>Saturday Shuttle Service for Golf/Bars</span>
              </li>
            </ul>
          </div>

          {/* Hotel Image */}
          <div className="bg-gradient-to-br from-secondary-dark/40 to-white/80 backdrop-blur-md rounded-2xl border border-secondary/30 overflow-hidden group">
            <div className="relative h-full min-h-[400px]">
              <img
                src="/images/hotel-exterior.jpg"
                alt="Your Stay Hotel"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.querySelector('.fallback').style.display = 'flex';
                }}
              />
              <div className="fallback hidden w-full h-full bg-gradient-to-br from-secondary-dark/60 to-gray-900 items-center justify-center flex-col p-8">
                <Home className="w-24 h-24 text-secondary mb-4" />
                <p className="text-white text-lg text-center">Add hotel image to<br/>/public/images/hotel-exterior.jpg</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-2xl font-bold text-white">The Hotel</h3>
                <p className="text-white/80">Hyatt Place, Seaport District</p>
              </div>
            </div>
          </div>

          {/* Google Maps */}
          <div className="bg-gradient-to-br from-secondary-dark/40 to-white/80 backdrop-blur-md rounded-2xl border border-secondary/30 overflow-hidden">
            <div className="relative h-full min-h-[400px]">
              <iframe 
 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2948.7633511461454!2d-71.03946068841799!3d42.34756853577074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e37a9d46c6f8c9%3A0x8eb1278655e94dd2!2sHyatt%20Place%20Boston%20%2F%20Seaport%20District!5e0!3m2!1sen!2sus!4v1762360268978!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Stay Location"
                className="absolute inset-0"
              ></iframe>
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {stay.length === 0 && (
          <div className="text-center py-20">
            <Home className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Loading resort information...</p>
          </div>
        )}
      </div>
    </div>
  )
}
