import React from 'react'
import { Trophy, Calendar, MapPin } from 'lucide-react'

export default function Landing() {
  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center items-center text-center text-gray-900 pt-20">
      {/* YouTube Video Background - Hidden on mobile, shows on desktop */}
      <div className="hidden md:block absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <iframe
          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2"
          
src="https://www.youtube.com/embed/QO4wH1t349E?start=125&end=185&autoplay=1&mute=1&loop=1&playlist=QO4wH1t349E&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Background video"
        ></iframe>
      </div>

      {/* Static Image Background - Shows on mobile */}
      <div className="md:hidden absolute inset-0 w-full h-full bg-cover bg-center" 
           style={{backgroundImage: "url('/images/golf-background.jpg')"}}>
      </div>
      
      {/* Dark Overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/50 to-white/90 z-0"></div>

      {/* Hero Content */}
      <div className="z-10 px-4 space-y-8">
        <div className="space-y-4">
          <h1 className="text-7xl md:text-9xl font-bold tracking-tight drop-shadow-2xl">
            BACHELOR CUP
          </h1>
          <p className="text-3xl md:text-5xl text-primary font-light drop-shadow-lg">
            2026
          </p>
        </div>

        <p className="text-xl md:text-2xl text-gray-800 max-w-2xl mx-auto font-light drop-shadow-lg">
          Where legends are made and friendships are forged on the fairways
        </p>

        {/* Event Details Cards */}
        <div className="flex flex-wrap justify-center gap-4 pt-8">
          <div className="bg-white/90 backdrop-blur-md px-8 py-4 rounded-xl border border-secondary/50 hover:border-primary/50 transition-all duration-300">
            <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-primary font-semibold text-sm">JUNE 13-15</p>
            <p className="text-gray-700 text-xs">2026</p>
          </div>
          
          <div className="bg-white/90 backdrop-blur-md px-8 py-4 rounded-xl border border-secondary/50 hover:border-primary/50 transition-all duration-300">
            <MapPin className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-primary font-semibold text-sm">PINEHURST</p>
            <p className="text-gray-700 text-xs">North Carolina</p>
          </div>
          
          <div className="bg-white/90 backdrop-blur-md px-8 py-4 rounded-xl border border-secondary/50 hover:border-primary/50 transition-all duration-300">
            <Trophy className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-primary font-semibold text-sm">12 PLAYERS</p>
            <p className="text-gray-700 text-xs">Two Teams</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-8">
          <a
            href="#roster"
            className="inline-block bg-primary hover:bg-primary-dark text-black font-bold px-10 py-4 rounded-lg text-lg transition-all duration-300 transform 
hover:scale-105 shadow-2xl"
          >
            View The Field
          </a>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-0"></div>
    </div>
  )
}
