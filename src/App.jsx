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
import { Lock } from 'lucide-react'

export default function App() {
  const [route, setRoute] = useState(window.location.hash.replace('#', '') || 'home')
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Change this to your desired password
  const CORRECT_PASSWORD = 'BachelorCup2026'

  useEffect(() => {
    const fn = () => setRoute(window.location.hash.replace('#', '') || 'home')
    window.addEventListener('hashchange', fn)
    const unsub = onAuthStateChanged(auth, u => setUser(u))
    
    // Check if user is already authenticated in session
    const auth_check = sessionStorage.getItem('authenticated')
    if (auth_check === 'true') {
      setIsAuthenticated(true)
    }
    
    return () => {
      window.removeEventListener('hashchange', fn)
      unsub()
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem('authenticated', 'true')
      setError('')
    } else {
      setError('Incorrect password. Try again.')
      setPassword('')
    }
  }

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-dark to-secondary-dark p-4">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-12 max-w-md w-full">
          <div className="text-center mb-8">
            <Lock className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">BACHELOR CUP 2026</h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-4"></div>
            <p className="text-gray-700">Enter password to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              autoFocus
            />
            
            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-black font-bold px-8 py-4 rounded-lg text-lg transition-all duration-300 transform 
hover:scale-105"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    )
  }

  // Show main app if authenticated
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar route={route} user={user} />
      
      {/* Main content - no extra padding needed since each component handles its own */}
      <main className="flex-1">
        {route === 'home' && <Landing />}
        {route === 'roster' && <Roster />}
        {route === 'stay' && <Stay />}
        {route === 'itinerary' && <Itinerary />}
        {route === 'draft' && <Draft />}
        {route === 'scoring' && <Scoring />}
      </main>

      {/* Footer */}
      <footer className="bg-black/90 border-t border-green-800/30 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            Bachelor Cup 2026 • A celebration of friendship, competition, and unforgettable moments
          </p>
        </div>
      </footer>
    </div>
  )
}
