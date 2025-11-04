import React, { useState } from 'react'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../firebase'


export default function Login(){
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState('')


async function handleLogin(e){
e.preventDefault()
try {
await signInWithEmailAndPassword(auth,email,password)
window.location.hash = '#draft'
} catch(err){
setError(err.message)
}
}


async function handleLogout(){
await signOut(auth)
}


return (
<div className="p-8 max-w-md mx-auto">
<h2 className="text-3xl text-espgGreen mb-4">Captain Login</h2>
<form onSubmit={handleLogin} className="flex flex-col gap-4">
<input type="email" placeholder="Email" value={email} 
onChange={e=>setEmail(e.target.value)} className="bg-transparent border 
border-gray-600 rounded px-3 py-2" required />
<input type="password" placeholder="Password" value={password} 
onChange={e=>setPassword(e.target.value)} className="bg-transparent border 
border-gray-600 rounded px-3 py-2" required />
<button type="submit" className="bg-espgGreen py-2 rounded">Login</button>
</form>
{error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
<button onClick={handleLogout} className="mt-4 text-sm underline 
text-gray-400">Logout</button>
</div>
)
}
