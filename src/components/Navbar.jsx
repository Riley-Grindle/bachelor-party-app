import React, { useState } from 'react'
import { Menu, X, Trophy } from 'lucide-react'

export default function Navbar({ route, user }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const links = [
    { href: '#home', label: 'Home' },
    { href: '#roster', label: 'Roster' },
    { href: '#stay', label: 'Stay' },
    { href: '#itinerary', label: 'Itinerary' },
    { href: '#draft', label: 'Draft' },
    { href: '#scoring', label: 'Scoring'}
  ]

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md 
border-b border-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Trophy className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-accent-dark tracking-tight">BACHELOR CUP 2026</h1>
              <p className="text-xs text-primary-dark">The Ultimate 
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
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray-700 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-900"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu 
className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 border-t 
border-secondary/30">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-6 py-4 text-sm font-semibold ${
                route === link.href.replace('#', '')
                  ? 'text-primary bg-secondary-dark/20'
                  : 'text-gray-700'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
