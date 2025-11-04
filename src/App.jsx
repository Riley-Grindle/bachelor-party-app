import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Roster from './components/Roster'
import Resort from './components/Resort'
import Itinerary from './components/Itinerary'
import Draft from './components/Draft'
import Login from './components/Login'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'


export default function App(){
const [route, setRoute] = 
useState(window.location.hash.replace('#','')||'home')
const [user, setUser] = useState(null)
useEffect(()=>{
const fn = ()=> setRoute(window.location.hash.replace('#','')||'home')
window.addEventListener('hashchange',fn)
const unsub = onAuthStateChanged(auth,u=>setUser(u))
return ()=>{window.removeEventListener('hashchange',fn); unsub()}
},[])


return (
<div className="min-h-screen flex flex-col text-white">
<Navbar route={route} user={user} />
<main className="flex-1">
{route==='home' && <Landing />}
{route==='roster' && <Roster />}
{route==='resort' && <Resort />}
{route==='itinerary' && <Itinerary />}
{route==='draft' && <Draft />}
{route==='login' && <Login />}
</main>
<footer className="p-4 text-center text-sm text-gray-400">ESPN golf themed 
— customize colors in tailwind.config.cjs</footer>
</div>
)
}
