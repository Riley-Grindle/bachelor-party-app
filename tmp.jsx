import React, { useEffect, useState } from "react";
import { db } from "../firebase.js";
import { ref, onValue, update } from "firebase/database";
import { Trophy, Lock, Unlock, Beer, Target } from 'lucide-react';

export default function Matchups() {
  const [draft, setDraft] = useState(null);
  const [matchups, setMatchups] = useState(null);
  const [selectedRound, setSelectedRound] = useState("puttshack");

  const rounds = [
    { id: "puttshack", name: "Puttshack" },
    { id: "graniteLinks", name: "Granite Links" },
    { id: "tbd", name: "TBD" }
  ];

  useEffect(() => {
    const draftRef = ref(db, "draft");
    const unsubscribe = onValue(draftRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setDraft(data);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const matchupsRef = ref(db, "matchups");
    const unsubscribe = onValue(matchupsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setMatchups(data);
    });
    return () => unsubscribe();
  }, []);

  const createPairing = (teamAPlayers, teamBPlayers) => {
    const roundData = matchups?.[selectedRound] || { pairings: [], locked: false };
    const newPairing = {
      teamA: teamAPlayers,
      teamB: teamBPlayers,
      holes: Array(18).fill(null).map(() => ({
        teamAScore: "",
        teamABeers: "",
        teamBScore: "",
        teamBBeers: ""
      }))
    };
    
    const updatedPairings = [...(roundData.pairings || []), newPairing];
    update(ref(db, `matchups/${selectedRound}`), {
      pairings: updatedPairings,
      locked: roundData.locked || false
    });
  };

  const toggleLock = () => {
    const roundData = matchups?.[selectedRound];
    if (roundData) {
      update(ref(db, `matchups/${selectedRound}/locked`), !roundData.locked);
    }
  };

  const updateScore = (pairingIndex, holeIndex, field, value) => {
    const roundData = matchups?.[selectedRound];
    if (!roundData || roundData.locked) return;

    const updatedPairings = [...roundData.pairings];
    updatedPairings[pairingIndex].holes[holeIndex][field] = value;
    
    update(ref(db, `matchups/${selectedRound}/pairings`), updatedPairings);
  };

  const calculateNetScore = (score, beers) => {
    const s = parseInt(score) || 0;
    const b = parseInt(beers) || 0;
    return Math.max(0, s - b);
  };

  const calculateMatchResult = (pairing) => {
    let teamAUp = 0;
    pairing.holes.forEach(hole => {
      const teamANet = calculateNetScore(hole.teamAScore, hole.teamABeers);
      const teamBNet = calculateNetScore(hole.teamBScore, hole.teamBBeers);
      
      if (teamANet > 0 && teamBNet > 0) {
        if (teamANet < teamBNet) teamAUp++;
        else if (teamBNet < teamANet) teamAUp--;
      }
    });
    return teamAUp;
  };

  const calculateTotalPoints = () => {
    let teamAPoints = 0;
    let teamBPoints = 0;

    rounds.forEach(round => {
      const roundData = matchups?.[round.id];
      if (roundData?.pairings) {
        roundData.pairings.forEach(pairing => {
          const result = calculateMatchResult(pairing);
          if (result > 0) teamAPoints += 1;
          else if (result < 0) teamBPoints += 1;
          else {
            teamAPoints += 0.5;
            teamBPoints += 0.5;
          }
        });
      }
    });

    return { teamAPoints, teamBPoints };
  };

  if (!draft) {
    return (
      <div className="pt-32 text-center text-gray-900 min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  const { teams = {} } = draft;
  const roundData = matchups?.[selectedRound] || { pairings: [], locked: false };
  const totalPoints = calculateTotalPoints();

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header with Total Score */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-primary-dark mb-6">MATCHUPS & SCORING</h1>
          
          {/* Total Points Display */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="bg-gradient-to-r from-accent-light to-accent-dark px-8 py-4 rounded-xl shadow-lg">
              <p className="text-white text-sm font-semibold mb-1">TEAM A</p>
              <p className="text-4xl font-bold text-white">{totalPoints.teamAPoints}</p>
            </div>
            <div className="flex items-center">
              <Trophy className="w-12 h-12 text-secondary" />
            </div>
            <div className="bg-gradient-to-r from-primary-light to-primary-dark px-8 py-4 rounded-xl shadow-lg">
              <p className="text-white text-sm font-semibold mb-1">TEAM B</p>
              <p className="text-4xl font-bold text-white">{totalPoints.teamBPoints}</p>
            </div>
          </div>

          {/* Round Selector */}
          <div className="flex justify-center gap-4 mb-8">
            {rounds.map(round => (
              <button
                key={round.id}
                onClick={() => setSelectedRound(round.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedRound === round.id
                    ? 'bg-primary text-black'
                    : 'bg-secondary-dark/20 text-gray-700 hover:bg-secondary-dark/40'
                }`}
              >
                {round.name}
              </button>
            ))}
          </div>

          {/* Lock Button */}
          <button
            onClick={toggleLock}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              roundData.locked
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {roundData.locked ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
            {roundData.locked ? 'Locked' : 'Unlocked'}
          </button>
        </div>

        {/* Create Pairings (if not locked) */}
        {!roundData.locked && (
          <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-secondary/30 p-6 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Create New Pairing</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-accent mb-2">Team A Players</h4>
                <div className="space-y-2">
                  {teams.TeamA?.map((player, i) => (
                    <label key={i} className="flex items-center gap-2 text-accent-dark">
                      <input type="checkbox" className="w-4 h-4" value={player} />
                      <span>{player}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2">Team B Players</h4>
                <div className="space-y-2">
                  {teams.TeamB?.map((player, i) => (
                    <label key={i} className="flex items-center gap-2 text-primary-dark">
                      <input type="checkbox" className="w-4 h-4" value={player} />
                      <span>{player}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                const teamAChecked = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
                  .filter(cb => teams.TeamA?.includes(cb.value))
                  .map(cb => cb.value);
                const teamBChecked = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
                  .filter(cb => teams.TeamB?.includes(cb.value))
                  .map(cb => cb.value);
                
                if (teamAChecked.length === 2 && teamBChecked.length === 2) {
                  createPairing(teamAChecked, teamBChecked);
                  document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
                } else {
                  alert('Please select exactly 2 players from each team');
                }
              }}
              className="mt-4 bg-primary hover:bg-primary-dark text-black font-bold px-6 py-3 rounded-lg"
            >
              Create Pairing
            </button>
          </div>
        )}

        {/* Matchup Table */}
        <div className="space-y-6">
          {roundData.pairings?.map((pairing, pIndex) => {
            const matchResult = calculateMatchResult(pairing);
            const teamAWinning = matchResult > 0;
            const teamBWinning = matchResult < 0;
            const tied = matchResult === 0;

            return (
              <div key={pIndex} className="bg-white/90 backdrop-blur-md rounded-2xl border border-secondary/30 overflow-hidden">
                {/* Pairing Header */}
                <div className="grid grid-cols-2 bg-gray-100">
                  <div className={`p-4 ${teamAWinning ? 'bg-accent-light' : ''}`}>
                    <h3 className="font-bold text-accent-dark text-lg">
                      {pairing.teamA.join(' & ')}
                      {teamAWinning && <span className="ml-2 text-sm">({Math.abs(matchResult)} UP)</span>}
                    </h3>
                  </div>
                  <div className={`p-4 ${teamBWinning ? 'bg-primary-light' : ''}`}>
                    <h3 className="font-bold text-primary-dark text-lg">
                      {pairing.teamB.join(' & ')}
                      {teamBWinning && <span className="ml-2 text-sm">({Math.abs(matchResult)} UP)</span>}
                    </h3>
                  </div>
                </div>

                {/* Holes */}
                <div className="divide-y divide-gray-200">
                  {pairing.holes.map((hole, hIndex) => {
                    const teamANet = calculateNetScore(hole.teamAScore, hole.teamABeers);
                    const teamBNet = calculateNetScore(hole.teamBScore, hole.teamBBeers);
                    const holeWinner = teamANet > 0 && teamBNet > 0 
                      ? (teamANet < teamBNet ? 'A' : teamBNet < teamANet ? 'B' : 'tie')
                      : 'none';

                    return (
                      <div key={hIndex} className="grid grid-cols-2">
                        {/* Team A */}
                        <div className={`p-4 ${holeWinner === 'A' ? 'bg-accent' : ''}`}>
                          <div className="flex items-center gap-4">
                            <span className="font-bold text-gray-600 w-8">#{hIndex + 1}</span>
                            <div className="flex gap-2 flex-1">
                              <div>
                                <div className="flex items-center gap-1 mb-1">
                                  <Target className="w-4 h-4 text-gray-500" />
                                  <input
                                    type="number"
                                    value={hole.teamAScore}
                                    onChange={(e) => updateScore(pIndex, hIndex, 'teamAScore', e.target.value)}
                                    className="w-16 px-2 py-1 border rounded text-center"
                                    placeholder="Score"
                                    disabled={roundData.locked}
                                  />
                                </div>
                                <div className="flex items-center gap-1">
                                  <Beer className="w-4 h-4 text-amber-600" />
                                  <input
                                    type="number"
                                    value={hole.teamABeers}
                                    onChange={(e) => updateScore(pIndex, hIndex, 'teamABeers', e.target.value)}
                                    className="w-16 px-2 py-1 border rounded text-center"
                                    placeholder="Beers"
                                    disabled={roundData.locked}
                                  />
                                </div>
                              </div>
                              {teamANet > 0 && (
                                <div className="flex items-center">
                                  <span className="text-lg font-bold text-red-600">= {teamANet}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Team B */}
                        <div className={`p-4 border-l ${holeWinner === 'B' ? 'bg-blue-50' : ''}`}>
                          <div className="flex items-center gap-4">
                            <div className="flex gap-2 flex-1">
                              <div>
                                <div className="flex items-center gap-1 mb-1">
                                  <Target className="w-4 h-4 text-gray-500" />
                                  <input
                                    type="number"
                                    value={hole.teamBScore}
                                    onChange={(e) => updateScore(pIndex, hIndex, 'teamBScore', e.target.value)}
                                    className="w-16 px-2 py-1 border rounded text-center"
                                    placeholder="Score"
                                    disabled={roundData.locked}
                                  />
                                </div>
                                <div className="flex items-center gap-1">
                                  <Beer className="w-4 h-4 text-amber-600" />
                                  <input
                                    type="number"
                                    value={hole.teamBBeers}
                                    onChange={(e) => updateScore(pIndex, hIndex, 'teamBBeers', e.target.value)}
                                    className="w-16 px-2 py-1 border rounded text-center"
                                    placeholder="Beers"
                                    disabled={roundData.locked}
                                  />
                                </div>
                              </div>
                              {teamBNet > 0 && (
                                <div className="flex items-center">
                                  <span className="text-lg font-bold text-blue-600">= {teamBNet}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {roundData.pairings?.length === 0 && (
          <div className="text-center py-20">
            <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No pairings created yet for this round</p>
          </div>
        )}
      </div>
    </div>
  );
}
