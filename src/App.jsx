import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Roster from './components/Roster'
import Stay from './components/Stay'
import Itinerary from './components/Itinerary'
import Draft from './components/Draft'
import Scoring from './components/Scoring'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'

export default function App() {
  const [route, setRoute] = useState(window.location.hash.replace('#', '') 
|| 'home')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fn = () => setRoute(window.location.hash.replace('#', '') || 
'home')
    window.addEventListener('hashchange', fn)
    const unsub = onAuthStateChanged(auth, u => setUser(u))
    return () => {
      window.removeEventListener('hashchange', fn)
      unsub()
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar route={route} user={user} />
      
      {/* Main content - no extra padding needed since each component 
handles its own */}
      <main className="flex-1">
        {route === 'home' && <Landing />}
        {route === 'roster' && <Roster />}
        {route === 'stay' && <Stay />}
        {route === 'itinerary' && <Itinerary />}
        {route === 'draft' && <Draft />}
        {route === 'scoring' && <Scoring />}
      </main>

      {/* Footer */}
      <footer className="bg-black/90 border-t border-green-800/30 py-8 
mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            Bachelor Cup 2026 • A celebration of friendship, competition, 
and unforgettable moments
          </p>
        </div>
      </footer>
    </div>
  )
}
