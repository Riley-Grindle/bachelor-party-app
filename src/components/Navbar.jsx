import React, { useState } from 'react'
import { Menu, X, Trophy } from 'lucide-react'

export default function Navbar({ route, user }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const links = [
    { href: '#home', label: 'Home' },
    { href: '#roster', label: 'Roster' },
    { href: '#resort', label: 'Resort' },
    { href: '#itinerary', label: 'Itinerary' },
    { href: '#draft', label: 'Draft' }
  ]

  return (
    <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-md 
border-b border-green-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <div>
              <h1 className="text-2xl font-bold text-white 
tracking-tight">BACHELOR CUP 2026</h1>
              <p className="text-xs text-green-400">The Ultimate 
Competition</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex space-x-8">
            {links.map(link => (
              <li key={link.href}>
                <a 
                  href={link.href} 
                  className={`text-sm font-semibold tracking-wide 
transition-all duration-200 ${
                    route === link.href.replace('#', '')
                      ? 'text-yellow-500 border-b-2 border-yellow-500'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* User Status */}
          <div className="hidden md:block">
            {user ? (
              <span className="text-sm text-gray-300">
                <span className="text-yellow-500">●</span> 
{user.email.split('@')[0]}
              </span>
            ) : (
              <a href="#login" className="text-sm text-gray-300 
hover:text-yellow-500 transition-colors">
                Captain Login
              </a>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu 
className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-t 
border-green-800/30">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-6 py-4 text-sm font-semibold ${
                route === link.href.replace('#', '')
                  ? 'text-yellow-500 bg-green-900/20'
                  : 'text-gray-300'
              }`}
            >
              {link.label}
            </a>
          ))}
          <div className="px-6 py-4 border-t border-green-800/30">
            {user ? (
              <span className="text-sm text-gray-300">
                Logged in: {user.email}
              </span>
            ) : (
              <a href="#login" className="text-sm text-yellow-500">
                Captain Login
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
