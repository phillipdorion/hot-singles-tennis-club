// components/MatchScoring.js
import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Text } from '@chakra-ui/react';

function MatchScoring() {
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [gameScore, setGameScore] = useState({ player1: 0, player2: 0 });
  const [setScore, setSetScore] = useState({ player1: 0, player2: 0 });

  const scorePoints = ['0', '15', '30', '40', 'Ad'];

  const updateScore = (player) => {
    if (player === 1) {
      setPlayer1Score((prevScore) => (prevScore + 1) % 5);
    } else {
      setPlayer2Score((prevScore) => (prevScore + 1) % 5);
    }

    // Check for game win
    if (
      (player1Score === 3 && player2Score <= 2) ||
      (player1Score === 4 && player2Score === 3)
    ) {
      setGameScore((prevScore) => ({ ...prevScore, player1: prevScore.player1 + 1 }));
      setPlayer1Score(0);
      setPlayer2Score(0);
    } else if (
      (player2Score === 3 && player1Score <= 2) ||
      (player2Score === 4 && player1Score === 3)
    ) {
      setGameScore((prevScore) => ({ ...prevScore, player2: prevScore.player2 + 1 }));
      setPlayer1Score(0);
      setPlayer2Score(0);
    }

    // Check for set win
    if (gameScore.player1 >= 6 && gameScore.player1 - gameScore.player2 >= 2) {
      setSetScore((prevScore) => ({ ...prevScore, player1: prevScore.player1 + 1 }));
      setGameScore({ player1: 0, player2: 0 });
    } else if (gameScore.player2 >= 6 && gameScore.player2 - gameScore.player1 >= 2) {
      setSetScore((prevScore) => ({ ...prevScore, player2: prevScore.player2 + 1 }));
      setGameScore({ player1: 0, player2: 0 });
    }
  };

  return (
    <Box>
      <VStack spacing={4}>
        <Text>Current Score: {scorePoints[player1Score]} - {scorePoints[player2Score]}</Text>
        <Text>Game Score: {gameScore.player1} - {gameScore.player2}</Text>
        <Text>Set Score: {setScore.player1} - {setScore.player2}</Text>
        <Button onClick={() => updateScore(1)}>Player 1 Scores</Button>
        <Button onClick={() => updateScore(2)}>Player 2 Scores</Button>
      </VStack>
    </Box>
  );
}

export default MatchScoring;