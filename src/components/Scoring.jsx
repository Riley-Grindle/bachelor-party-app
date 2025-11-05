import React, { useEffect, useState } from "react";
import { db } from "../firebase.js";
import { ref, onValue, update } from "firebase/database";
import { Trophy, Lock, Unlock, Beer, Target, X } from 'lucide-react';

export default function Matchups() {
  const [draft, setDraft] = useState(null);
  const [matchups, setMatchups] = useState(null);
  const [selectedRound, setSelectedRound] = useState("puttshack");

  const rounds = [
    { id: "puttshack", name: "Puttshack" },
    { id: "graniteLinks", name: "Granite Links" },
    { id: "georgeWright", name: "George Wright GC" }
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

  // Get players already in pairings for this round
  const getPlayersInPairings = () => {
    const roundData = matchups?.[selectedRound];
    if (!roundData?.pairings) return [];
    
    const players = [];
    roundData.pairings.forEach(pairing => {
      players.push(...pairing.teamA, ...pairing.teamB);
    });
    return players;
  };

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

  const removePairing = (pairingIndex) => {
    const roundData = matchups?.[selectedRound];
    if (!roundData || roundData.locked) return;

    const updatedPairings = roundData.pairings.filter((_, index) => index !== pairingIndex);
    update(ref(db, `matchups/${selectedRound}`), {
      pairings: updatedPairings,
      locked: roundData.locked
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
    
    // Fix: Update the entire pairings array as an object
    update(ref(db, `matchups/${selectedRound}`), {
      pairings: updatedPairings,
      locked: roundData.locked
    });
  };

  const calculateNetScore = (score, beers) => {
    const s = parseInt(score) || 0;
    const b = parseInt(beers) || 0;
    return (s - b);
  };

  const calculateMatchResult = (pairing) => {
    let teamAUp = 0;
    pairing.holes.forEach(hole => {
      const teamANet = calculateNetScore(hole.teamAScore, hole.teamABeers);
      const teamBNet = calculateNetScore(hole.teamBScore, hole.teamBBeers);
      
      // Check if both teams have entered a score (not empty string)
      if (hole.teamAScore !== "" && hole.teamBScore !== "") {
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
  const playersInPairings = getPlayersInPairings();

  // Filter out players already in pairings
  const availableTeamA = teams.TeamA?.filter(player => !playersInPairings.includes(player)) || [];
  const availableTeamB = teams.TeamB?.filter(player => !playersInPairings.includes(player)) || [];

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
                  {availableTeamA.map((player, i) => (
                    <label key={i} className="flex items-center gap-2 text-accent-dark">
                      <input type="checkbox" className="w-4 h-4" value={player} />
                      <span>{player}</span>
                    </label>
                  ))}
                  {availableTeamA.length === 0 && (
                    <p className="text-gray-500 text-sm">All players assigned to pairings</p>
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2">Team B Players</h4>
                <div className="space-y-2">
                  {availableTeamB.map((player, i) => (
                    <label key={i} className="flex items-center gap-2 text-primary-dark">
                      <input type="checkbox" className="w-4 h-4" value={player} />
                      <span>{player}</span>
                    </label>
                  ))}
                  {availableTeamB.length === 0 && (
                    <p className="text-gray-500 text-sm">All players assigned to pairings</p>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                const teamAChecked = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
                  .filter(cb => availableTeamA.includes(cb.value))
                  .map(cb => cb.value);
                const teamBChecked = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
                  .filter(cb => availableTeamB.includes(cb.value))
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

        {/* Matchup Tables - Scorecard Style */}
        <div className="space-y-6">
          {roundData.pairings?.map((pairing, pIndex) => {
            const matchResult = calculateMatchResult(pairing);
            const teamAWinning = matchResult > 0;
            const teamBWinning = matchResult < 0;

            return (
              <div key={pIndex} className="bg-white/90 backdrop-blur-md rounded-2xl border border-secondary/30 overflow-hidden">
                {/* Pairing Header */}
                <div className="bg-gray-100 p-4 flex items-center justify-between">
                  <div className="flex gap-8">
                    <div className={`${teamAWinning ? 'font-bold' : ''}`}>
                      <span className="text-accent-dark text-lg">
                        {pairing.teamA.join(' & ')}
                        {teamAWinning && <span className="ml-2 text-sm">({Math.abs(matchResult)} UP)</span>}
                      </span>
                    </div>
                    <div className={`${teamBWinning ? 'font-bold' : ''}`}>
                      <span className="text-primary-dark text-lg">
                        {pairing.teamB.join(' & ')}
                        {teamBWinning && <span className="ml-2 text-sm">({Math.abs(matchResult)} UP)</span>}
                      </span>
                    </div>
                  </div>
                  {!roundData.locked && (
                    <button
                      onClick={() => removePairing(pIndex)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-100 p-2 rounded-lg transition-colors"
                      title="Remove pairing"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Scorecard Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="px-2 py-2 text-center w-12">Hole</th>
                        <th className="px-2 py-2 text-center text-accent-dark border-l" colSpan="3">Team A</th>
                        <th className="px-2 py-2 text-center text-primary-dark border-l" colSpan="3">Team B</th>
                      </tr>
                      <tr className="bg-gray-50 border-b text-xs">
                        <th></th>
                        <th className="px-1 py-1 border-l text-black">Score</th>
                        <th className="px-1 py-1 text-black">Beers</th>
                        <th className="px-1 py-1 text-black">Net</th>
                        <th className="px-1 py-1 border-l text-black">Score</th>
                        <th className="px-1 py-1 text-black">Beers</th>
                        <th className="px-1 py-1 text-black">Net</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pairing.holes.map((hole, hIndex) => {
                        const teamANet = calculateNetScore(hole.teamAScore, hole.teamABeers);
                        const teamBNet = calculateNetScore(hole.teamBScore, hole.teamBBeers);
                        // Check if scores are entered (not empty strings) before determining winner
                        const holeWinner = hole.teamAScore !== "" && hole.teamBScore !== ""
                          ? (teamANet < teamBNet ? 'A' : teamBNet < teamANet ? 'B' : 'tie')
                          : 'none';

                        return (
                          <tr key={hIndex} className="border-b hover:bg-gray-50">
                            <td className="px-2 py-1 text-center font-semibold text-gray-600">{hIndex + 1}</td>
                            
                            {/* Team A */}
                            <td className={`px-1 py-1 border-l ${holeWinner === 'A' ? 'bg-accent/20' : ''}`}>
                              <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={hole.teamAScore}
                                onChange={(e) => updateScore(pIndex, hIndex, 'teamAScore', e.target.value)}
                                className="w-full px-1 py-1 border rounded text-center text-sm text-black"
                                placeholder="-"
                                disabled={roundData.locked}
                              />
                            </td>
                            <td className={`px-1 py-1 ${holeWinner === 'A' ? 'bg-accent/20' : ''}`}>
                              <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={hole.teamABeers}
                                onChange={(e) => updateScore(pIndex, hIndex, 'teamABeers', e.target.value)}
                                className="w-full px-1 py-1 border rounded text-center text-sm text-black"
                                placeholder="-"
                                disabled={roundData.locked}
                              />
                            </td>
                            <td className={`px-1 py-1 text-center font-semibold ${holeWinner === 'A' ? 'bg-accent/20 text-accent-dark' : 'text-gray-600'}`}>
                              {hole.teamAScore !== "" ? teamANet : '-'}
                            </td>
                            
                            {/* Team B */}
                            <td className={`px-1 py-1 border-l ${holeWinner === 'B' ? 'bg-blue-100' : ''}`}>
                              <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={hole.teamBScore}
                                onChange={(e) => updateScore(pIndex, hIndex, 'teamBScore', e.target.value)}
                                className="w-full px-1 py-1 border rounded text-center text-sm text-black"
                                placeholder="-"
                                disabled={roundData.locked}
                              />
                            </td>
                            <td className={`px-1 py-1 ${holeWinner === 'B' ? 'bg-blue-100' : ''}`}>
                              <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={hole.teamBBeers}
                                onChange={(e) => updateScore(pIndex, hIndex, 'teamBBeers', e.target.value)}
                                className="w-full px-1 py-1 border rounded text-center text-sm text-black"
                                placeholder="-"
                                disabled={roundData.locked}
                              />
                            </td>
                            <td className={`px-1 py-1 text-center font-semibold ${holeWinner === 'B' ? 'bg-blue-100 text-primary-dark' : 'text-gray-600'}`}>
                              {hole.teamBScore !== "" ? teamBNet : '-'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
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
