import React from 'react'


export default function Navbar({ route, user }){
const links = [
{ href: '#home', label: 'Home' },
{ href: '#roster', label: 'Roster' },
{ href: '#resort', label: 'Resort' },
{ href: '#itinerary', label: 'Itinerary' },
{ href: '#draft', label: 'Draft' }
]


return (
<nav className="flex items-center justify-between bg-espgGreen text-white 
px-6 py-3 shadow-lg">
<div className="font-bold text-xl tracking-wide">Bachelor Bash 2025</div>
<ul className="flex gap-4">
{links.map(link => (
<li key={link.href}>
<a href={link.href} className={`hover:underline 
${route===link.href.replace('#','') ? 'font-bold' : ''}`}>{link.label}</a>
</li>
))}
</ul>
<div>
{user ? <span className="text-sm">Logged in as {user.email}</span> : <a 
href="#login" className="underline text-sm">Login</a>}
</div>
</nav>
)
}
