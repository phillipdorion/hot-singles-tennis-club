import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Select, VStack, HStack, Input } from '@chakra-ui/react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useAuth } from '../contexts/AuthContext';

function MatchLogging() {
  const { currentUser } = useAuth();
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState('');
  const [sets, setSets] = useState([{ setNumber: 1, player1Score: '', player2Score: '', tiebreaker: '' }]);

  useEffect(() => {
    const fetchMatches = async () => {
      const querySnapshot = await getDocs(collection(db, 'matches'));
      setMatches(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchMatches();
  }, []);

  const handleAddSet = () => {
    if (sets.length < 3) {
      setSets([...sets, { setNumber: sets.length + 1, player1Score: '', player2Score: '', tiebreaker: '' }]);
    }
  };

  const handleSetChange = (index, field, value) => {
    const newSets = sets.map((set, i) => (i === index ? { ...set, [field]: value } : set));
    setSets(newSets);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const matchDocRef = collection(db, 'matchResults');
      await addDoc(matchDocRef, {
        matchId: selectedMatch,
        sets,
        loggedBy: currentUser.email,
      });
      alert('Match result logged successfully');
    } catch (error) {
      console.error('Failed to log match result', error);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="match">
            <FormLabel>Select Match</FormLabel>
            <Select value={selectedMatch} onChange={(e) => setSelectedMatch(e.target.value)} required>
              <option value="">Select a match</option>
              {matches.map((match) => (
                <option key={match.id} value={match.id}>
                  {match.player1} vs {match.player2} on {new Date(match.date.toDate()).toLocaleDateString()}
                </option>
              ))}
            </Select>
          </FormControl>
          {sets.map((set, index) => (
            <HStack key={index} spacing={4}>
              <FormControl id={`set-${index + 1}`}>
                <FormLabel>Set {set.setNumber} Scores</FormLabel>
                <Input
                  placeholder="Player 1 Score"
                  value={set.player1Score}
                  onChange={(e) => handleSetChange(index, 'player1Score', e.target.value)}
                  required
                />
                <Input
                  placeholder="Player 2 Score"
                  value={set.player2Score}
                  onChange={(e) => handleSetChange(index, 'player2Score', e.target.value)}
                  required
                />
                <Input
                  placeholder="Tiebreaker (if any)"
                  value={set.tiebreaker}
                  onChange={(e) => handleSetChange(index, 'tiebreaker', e.target.value)}
                />
              </FormControl>
            </HStack>
          ))}
          {sets.length < 3 && (
            <Button onClick={handleAddSet} colorScheme="teal" size="sm">
              Add Set
            </Button>
          )}
          <Button type="submit" colorScheme="teal" size="lg" width="full">
            Log Match Result
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default MatchLogging;