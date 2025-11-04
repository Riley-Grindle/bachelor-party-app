import React, { useEffect, useState } from "react";
import { db } from "../firebase.js";
import { ref, onValue } from "firebase/database";
import { User, ChevronRight } from 'lucide-react';

export default function Roster() {
  const [roster, setRoster] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    const rosterRef = ref(db, "roster");
    const unsubscribe = onValue(rosterRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
  const rosterArray = Object.entries(data).map(([id, playerData]) => {
    // Handle both old and new Firebase formats
    if (typeof playerData === "string") {
      return {
        id,
        name: playerData,
        nickname: `Player ${id}`,
        handicap: Math.floor(Math.random() * 20) + 5,
        hometown: "TBD",
        bio: "Competitive golfer ready to dominate the Bachelor Cup.",
        image: `https://images.unsplash.com/photo-${
          [
            '1566492031773-4f4e44671857',
            '1507003211169-0a1dd7228f2d',
            '1500648767791-00dcc994a43e',
            '1506794778202-cad84cf45f1d'
          ][parseInt(id) - 1] || '1566492031773-4f4e44671857'
        }?w=400&h=400&fit=crop`
      };
    } else {
      // Already an object with player info
      return { id, ...playerData };
    }
  });
  setRoster(rosterArray);
}
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">THE FIELD</h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Meet the competitors of Bachelor Cup 2026</p>
        </div>

        {/* Player Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {roster.map(player => (
            <div
              key={player.id}
              onClick={() => setSelectedPlayer(player)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-green-900/40 to-black/60 border border-green-700/30 hover:border-yellow-500/80 transition-all duration-300 transform hover:scale-105">
                {/* Player Image */}
                <div className="aspect-square overflow-hidden bg-gray-800">
                  <img
                    src={player.image}
                    alt={player.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23374151" width="400" height="400"/%3E%3C/svg%3E';
                    }}
                  />
                </div>
                
                {/* Player Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white">{player.name}</h3>
                      <p className="text-yellow-500 text-sm italic">{player.nickname}</p>
                    </div>
                    <div className="bg-green-900/60 px-3 py-1 rounded-full flex-shrink-0">
                      <p className="text-xs text-white font-semibold">HCP {player.handicap}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-xs mb-3">{player.hometown}</p>
                  
                  <div className="flex items-center text-yellow-500 text-sm group-hover:text-yellow-400 transition-colors">
                    <span>View Bio</span>
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {roster.length === 0 && (
          <div className="text-center py-20">
            <User className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Loading roster...</p>
          </div>
        )}
      </div>

      {/* Player Detail Modal */}
      {selectedPlayer && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPlayer(null)}
        >
          <div
            className="bg-gradient-to-br from-green-900/90 to-black/90 border border-yellow-500/50 rounded-3xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row gap-8">
              {/* Player Image */}
              <img
                src={selectedPlayer.image}
                alt={selectedPlayer.name}
                className="w-full md:w-48 h-48 object-cover rounded-2xl flex-shrink-0"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23374151" width="400" height="400"/%3E%3C/svg%3E';
                }}
              />
              
              {/* Player Details */}
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-white mb-2">{selectedPlayer.name}</h3>
                <p className="text-yellow-500 text-lg italic mb-4">{selectedPlayer.nickname}</p>
                
                <div className="space-y-3 mb-6">
                  <p className="text-gray-300">
                    <span className="text-yellow-500 font-semibold">Handicap:</span> {selectedPlayer.handicap}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-yellow-500 font-semibold">Hometown:</span> {selectedPlayer.hometown}
                  </p>
                </div>
                
                <div className="border-t border-green-800/50 pt-4">
                  <h4 className="text-yellow-500 font-semibold mb-2">Biography</h4>
                  <p className="text-gray-300 leading-relaxed">{selectedPlayer.bio}</p>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setSelectedPlayer(null)}
              className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
