import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { ref, onValue } from 'firebase/database'


export default function Itinerary(){
const [itinerary, setItinerary] = useState([])


useEffect(()=>{
const iRef = ref(db,'/itinerary')
onValue(iRef,snap=> setItinerary(snap.val()||[]))
},[])


return (
<div className="p-8">
<h2 className="text-3xl text-espgGreen mb-4">Itinerary</h2>
<div className="space-y-6">
{itinerary.map((d,i)=>(
<div key={i} className="glass rounded-xl p-4">
<h3 className="text-2xl font-semibold mb-2">{d.day}</h3>
<ul className="list-disc ml-6">
{d.items.map((item,idx)=>(<li key={idx}>{item}</li>))}
</ul>
</div>
))}
</div>
</div>
)
}
