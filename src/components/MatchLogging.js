import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

function MatchLogging() {
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState('');
  const [matchLocation, setMatchLocation] = useState('');
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [winner, setWinner] = useState('');
  const [setsPlayed, setSetsPlayed] = useState(1);
  const [setScores, setSetScores] = useState([{ player1: '', player2: '' }]);

  useEffect(() => {
    const fetchMatches = async () => {
      const querySnapshot = await getDocs(collection(db, 'matches'));
      const matchesData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setMatches(matchesData);
    };

    fetchMatches();
  }, []);

  const handleLogResult = async (e) => {
    e.preventDefault();
    try {
      const matchRef = doc(db, 'matches', selectedMatch);
      await updateDoc(matchRef, { matchLocation, player1, player2, winner, setsPlayed, setScores });
      alert('Match result logged successfully');
    } catch (error) {
      console.error('Error logging match result', error);
      alert('Error logging match result');
    }
  };

  const handleSetScoresChange = (index, field, value) => {
    const newSetScores = [...setScores];
    newSetScores[index][field] = value;
    setSetScores(newSetScores);
  };

  return (
    <div>
      <form onSubmit={handleLogResult}>
        <select
          value={selectedMatch}
          onChange={(e) => setSelectedMatch(e.target.value)}
          required
        >
          <option value="" disabled>Select Match</option>
          {matches.map((match) => (
            <option key={match.id} value={match.id}>
              {match.player1} vs {match.player2} on {match.matchDate}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Match Location"
          value={matchLocation}
          onChange={(e) => setMatchLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Player 1"
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Player 2"
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Winner"
          value={winner}
          onChange={(e) => setWinner(e.target.value)}
          required
        />
        <select
          value={setsPlayed}
          onChange={(e) => setSetsPlayed(parseInt(e.target.value))}
          required
        >
          <option value="1">1 Set</option>
          <option value="2">2 Sets</option>
          <option value="3">3 Sets</option>
        </select>
        {Array.from({ length: setsPlayed }).map((_, index) => (
          <div key={index}>
            <h3>Set {index + 1} Score</h3>
            <input
              type="number"
              placeholder="Player 1 Games Won"
              value={setScores[index]?.player1 || ''}
              onChange={(e) => handleSetScoresChange(index, 'player1', e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Player 2 Games Won"
              value={setScores[index]?.player2 || ''}
              onChange={(e) => handleSetScoresChange(index, 'player2', e.target.value)}
              required
            />
          </div>
        ))}
        <button type="submit">Log Result</button>
      </form>
    </div>
  );
}

export default MatchLogging;