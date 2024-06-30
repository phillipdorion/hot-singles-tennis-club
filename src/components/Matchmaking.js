import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

function Matchmaking() {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [matchDate, setMatchDate] = useState('');

  const handleScheduleMatch = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'matches'), {
        player1,
        player2,
        matchDate
      });
      alert('Match scheduled successfully');
    } catch (error) {
      console.error('Error scheduling match', error);
      alert('Error scheduling match');
    }
  };

  return (
    <form onSubmit={handleScheduleMatch}>
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
        type="date"
        placeholder="Match Date"
        value={matchDate}
        onChange={(e) => setMatchDate(e.target.value)}
        required
      />
      <button type="submit">Schedule Match</button>
    </form>
  );
}

export default Matchmaking;