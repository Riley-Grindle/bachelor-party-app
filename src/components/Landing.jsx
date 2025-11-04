import React from 'react'
import { Trophy, Calendar, MapPin } from 'lucide-react'

export default function Landing() {
  return (
    <div className="relative w-full min-h-screen flex flex-col 
justify-center items-center text-center text-white pt-20">
      {/* Video Background */}
      <video autoPlay loop muted playsInline className="video-bg">
        <source src="/video.mp4" type="video/mp4" />
      </video>
      
      {/* Dark Overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 
via-black/40 to-black/80 z-0"></div>

      {/* Hero Content */}
      <div className="z-10 px-4 space-y-8">
        <div className="space-y-4">
          <h1 className="text-7xl md:text-9xl font-bold tracking-tight 
drop-shadow-2xl">
            BACHELOR CUP
          </h1>
          <p className="text-3xl md:text-5xl text-yellow-500 font-light 
drop-shadow-lg">
            2026
          </p>
        </div>

        <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto 
font-light drop-shadow-lg">
          Where legends are made and friendships are forged on the 
fairways
        </p>

        {/* Event Details Cards */}
        <div className="flex flex-wrap justify-center gap-4 pt-8">
          <div className="bg-black/70 backdrop-blur-md px-8 py-4 
rounded-xl border border-green-700/50 hover:border-yellow-500/50 
transition-all duration-300">
            <Calendar className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
            <p className="text-yellow-500 font-semibold text-sm">JUNE 
13-15</p>
            <p className="text-gray-300 text-xs">2026</p>
          </div>
          
          <div className="bg-black/70 backdrop-blur-md px-8 py-4 
rounded-xl border border-green-700/50 hover:border-yellow-500/50 
transition-all duration-300">
            <MapPin className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
            <p className="text-yellow-500 font-semibold 
text-sm">PINEHURST</p>
            <p className="text-gray-300 text-xs">North Carolina</p>
          </div>
          
          <div className="bg-black/70 backdrop-blur-md px-8 py-4 
rounded-xl border border-green-700/50 hover:border-yellow-500/50 
transition-all duration-300">
            <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
            <p className="text-yellow-500 font-semibold text-sm">12 
PLAYERS</p>
            <p className="text-gray-300 text-xs">Two Teams</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-8">
          <a 
            href="#roster" 
            className="inline-block bg-yellow-500 hover:bg-yellow-600 
text-black font-bold px-10 py-4 rounded-lg text-lg transition-all 
duration-300 transform hover:scale-105 shadow-2xl"
          >
            View The Field
          </a>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 
bg-gradient-to-t from-black to-transparent z-0"></div>
    </div>
  )
}
