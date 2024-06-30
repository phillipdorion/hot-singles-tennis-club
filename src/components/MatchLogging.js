import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore';

function MatchLogging() {
  const db = getFirestore();
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

  // ... rest of your component code (handleLogResult, handleSetScoresChange, and return statement)
}

export default MatchLogging;