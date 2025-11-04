import React, { useEffect, useState } from "react";
import { db } from "../firebase.js";
import { ref, onValue } from "firebase/database";

export default function Roster() {
  const [roster, setRoster] = useState([]);

  useEffect(() => {
    const rosterRef = ref(db, "roster");
    const unsubscribe = onValue(rosterRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setRoster(Object.values(data));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-3xl mx-auto text-center text-white mt-10">
      <h1 className="text-3xl font-bold mb-4">Bachelor Party Roster</h1>
      <ul className="grid grid-cols-2 gap-4">
        {roster.map((name, i) => (
          <li key={i} className="bg-gray-800 p-3 rounded-xl">
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

