import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { ref, onValue } from 'firebase/database'


export default function Resort(){
const [resort, setResort] = useState([])


useEffect(()=>{
const rRef = ref(db,'/resort')
onValue(rRef,snap=> setResort(snap.val()||[]))
},[])


return (
<div className="p-8">
<h2 className="text-3xl text-espgGreen mb-4">The Resort</h2>
<div className="grid md:grid-cols-2 gap-6">
{resort.map((r,i)=>(
<div key={i} className="glass rounded-xl overflow-hidden">
{r.img && <img src={r.img} alt={r.title} className="w-full h-48 
object-cover" />}
<div className="p-4">
<h3 className="text-xl font-semibold">{r.title}</h3>
<p className="text-gray-300 text-sm mt-2">{r.desc}</p>
</div>
</div>
))}
</div>
</div>
)
}
