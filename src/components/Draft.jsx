import React, { useEffect, useState } from "react";
import { db } from "../firebase.js";
import { ref, onValue, update } from "firebase/database";

export default function Draft() {
  const [draft, setDraft] = useState(null);

  useEffect(() => {
    const draftRef = ref(db, "draft");
    const unsubscribe = onValue(draftRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setDraft(data);
    });
    return () => unsubscribe();
  }, []);

  const handlePick = (player) => {
    if (!draft) return;

    const { currentCaptain, teams = {}, availablePlayers = {} } = draft;

    // Defensive copies
    const updatedPlayers = { ...availablePlayers };
    delete updatedPlayers[player];

    const updatedTeams = {
      TeamA: [...(teams.TeamA || [])],
      TeamB: [...(teams.TeamB || [])],
    };
    updatedTeams[currentCaptain].push(player);

    // Toggle to next captain
    const nextCaptain = currentCaptain === "TeamA" ? "TeamB" : "TeamA";

    update(ref(db, "draft"), {
      availablePlayers: updatedPlayers,
      teams: updatedTeams,
      currentCaptain: nextCaptain,
    });
  };

  const handleReset = () => {
  const initialState = {
    availablePlayers: {
      Chris: true,
      Drew: true,
      Evan: true,
      Jake: true,
      Josh: true,
      Kyle: true,
      Matt: true,
      Nick: true,
      Riley: true,
      Ryan: true,
      Tyler: true,
      Zach: true,
    },
    teams: {
      TeamA: [],
      TeamB: [],
    },
    currentCaptain: "TeamA",
  };

  update(ref(db, "draft"), initialState);
};


  if (!draft)
    return (
      <div className="text-center mt-10 text-white">Loading draft...</div>
    );

  const { currentCaptain, teams = {}, availablePlayers = {} } = draft;

  return (
    <div className="max-w-4xl mx-auto text-white text-center mt-10">
      <h1 className="text-3xl mb-6 font-bold">Live Snake Draft</h1>
      <h2 className="text-xl mb-4">
        Current Pick:{" "}
        <span className="text-yellow-400">{currentCaptain || "?"}</span>
      </h2>

      {/* Teams */}
      <div className="flex justify-around mt-6">
        {Object.entries(teams).map(([team, players]) => (
          <div key={team}>
            <h3 className="text-2xl font-semibold mb-2">{team}</h3>
            <ul>
              {(players || []).map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Available Players */}
      <div className="mt-10">
        <h3 className="text-xl mb-2">Available Players</h3>
        <div className="flex flex-wrap gap-2 justify-center">
          {Object.keys(availablePlayers || {}).length > 0 ? (
            Object.keys(availablePlayers).map((player) => (
              <button
                key={player}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 
rounded"
                onClick={() => handlePick(player)}
              >
                {player}
              </button>
            ))
          ) : (
            <p className="text-gray-400">All players have been 
drafted!</p>
          )}
        </div>
      </div>
    <button
    onClick={handleReset}
    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
  >
    Reset Draft
  </button>
    </div>
  );
}

