import React, { useEffect, useState } from "react";
import { db } from "../firebase.js";
import { ref, onValue, update } from "firebase/database";
import { Trophy, Users, RefreshCw } from 'lucide-react';

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
      <div className="pt-32 text-center text-white min-h-screen flex 
items-center justify-center">
        <div>
          <Users className="w-16 h-16 text-gray-600 mx-auto mb-4 
animate-pulse" />
          <p className="text-gray-400 text-lg">Loading draft...</p>
        </div>
      </div>
    );

  const { currentCaptain, teams = {}, availablePlayers = {} } = draft;
  const availableCount = Object.keys(availablePlayers).length;
  const isDraftComplete = availableCount === 0;

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white 
mb-4">LIVE DRAFT</h1>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
          
          {!isDraftComplete ? (
            <div className="inline-block bg-gradient-to-r from-yellow-600 
to-yellow-500 px-8 py-4 rounded-xl">
              <p className="text-black text-sm font-semibold mb-1">NOW 
SELECTING</p>
              <h2 className="text-3xl font-bold text-black">
                {currentCaptain === "TeamA" ? "TEAM A" : "TEAM B"}
              </h2>
            </div>
          ) : (
            <div className="inline-block bg-gradient-to-r from-green-600 
to-green-500 px-8 py-4 rounded-xl">
              <Trophy className="w-8 h-8 text-white mx-auto mb-2" />
              <p className="text-white text-2xl font-bold">DRAFT 
COMPLETE!</p>
            </div>
          )}
        </div>

        {/* Teams Display */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Team A */}
          <div className={`bg-gradient-to-br from-blue-900/40 to-black/60 
backdrop-blur-md rounded-2xl border-2 transition-all duration-300 ${
            currentCaptain === "TeamA" && !isDraftComplete
              ? 'border-yellow-500 shadow-lg shadow-yellow-500/20'
              : 'border-blue-700/30'
          }`}>
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 
px-6 py-4 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">TEAM A</h3>
              <div className="bg-white/20 px-3 py-1 rounded-full">
                <span className="text-white font-bold">{(teams.TeamA || 
[]).length}</span>
              </div>
            </div>
            <div className="p-6">
              {(teams.TeamA || []).length > 0 ? (
                <ul className="space-y-3">
                  {(teams.TeamA || []).map((player, idx) => (
                    <li
                      key={idx}
                      className="bg-blue-800/30 px-4 py-3 rounded-lg flex 
items-center justify-between group hover:bg-blue-800/50 transition-colors"
                    >
                      <span className="text-white 
font-semibold">{player}</span>
                      <span className="text-blue-400 text-sm">Pick #{idx + 
1}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-blue-700 mx-auto mb-2" 
/>
                  <p className="text-gray-400">No players selected</p>
                </div>
              )}
            </div>
          </div>

          {/* Team B */}
          <div className={`bg-gradient-to-br from-red-900/40 to-black/60 
backdrop-blur-md rounded-2xl border-2 transition-all duration-300 ${
            currentCaptain === "TeamB" && !isDraftComplete
              ? 'border-yellow-500 shadow-lg shadow-yellow-500/20'
              : 'border-red-700/30'
          }`}>
            <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 
py-4 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">TEAM B</h3>
              <div className="bg-white/20 px-3 py-1 rounded-full">
                <span className="text-white font-bold">{(teams.TeamB || 
[]).length}</span>
              </div>
            </div>
            <div className="p-6">
              {(teams.TeamB || []).length > 0 ? (
                <ul className="space-y-3">
                  {(teams.TeamB || []).map((player, idx) => (
                    <li
                      key={idx}
                      className="bg-red-800/30 px-4 py-3 rounded-lg flex 
items-center justify-between group hover:bg-red-800/50 transition-colors"
                    >
                      <span className="text-white 
font-semibold">{player}</span>
                      <span className="text-red-400 text-sm">Pick #{idx + 
1}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-red-700 mx-auto mb-2" 
/>
                  <p className="text-gray-400">No players selected</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Available Players */}
        <div className="bg-gradient-to-br from-green-900/40 to-black/60 
backdrop-blur-md rounded-2xl border border-green-700/30 p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white flex 
items-center">
              <Users className="w-6 h-6 text-yellow-500 mr-3" />
              Available Players
            </h3>
            <span className="bg-yellow-500 text-black px-4 py-2 
rounded-full font-bold text-sm">
              {availableCount} Left
            </span>
          </div>

          {availableCount > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
lg:grid-cols-6 gap-4">
              {Object.keys(availablePlayers).map((player) => (
                <button
                  key={player}
                  className="bg-gradient-to-br from-green-700 to-green-800 
hover:from-yellow-600 hover:to-yellow-500 text-white hover:text-black px-4 
py-6 rounded-xl font-semibold transition-all duration-300 transform 
hover:scale-105 hover:shadow-lg"
                  onClick={() => handlePick(player)}
                >
                  {player}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" 
/>
              <p className="text-gray-400 text-lg">All players have been 
drafted!</p>
            </div>
          )}
        </div>

        {/* Reset Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleReset}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 
rounded-xl font-bold inline-flex items-center space-x-2 transition-all 
duration-300 transform hover:scale-105"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Reset Draft</span>
          </button>
        </div>
      </div>
    </div>
  );
}
