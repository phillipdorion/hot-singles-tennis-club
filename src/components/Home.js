import React, { useEffect, useState } from 'react';
import { Box, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function Home() {
  const [newMembers, setNewMembers] = useState([]);
  const [latestMatches, setLatestMatches] = useState([]);

  useEffect(() => {
    const fetchNewMembers = async () => {
      const q = query(collection(db, 'members'), orderBy('joinedAt', 'desc'), limit(5));
      const querySnapshot = await getDocs(q);
      setNewMembers(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    const fetchLatestMatches = async () => {
      const q = query(collection(db, 'matches'), orderBy('date', 'desc'), limit(5));
      const querySnapshot = await getDocs(q);
      setLatestMatches(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchNewMembers();
    fetchLatestMatches();
  }, []);

  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>
        Welcome to Hot Singles Tennis Club
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Newly Joined Members
          </Heading>
          <VStack align="stretch" spacing={2}>
            {newMembers.map((member) => (
              <Text key={member.id}>{member.name} - Joined {new Date(member.joinedAt.toDate()).toLocaleDateString()}</Text>
            ))}
          </VStack>
        </Box>
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Latest Match Results
          </Heading>
          <VStack align="stretch" spacing={2}>
            {latestMatches.map((match) => (
              <Text key={match.id}>
                {match.player1} vs {match.player2} - {new Date(match.date.toDate()).toLocaleDateString()}
              </Text>
            ))}
          </VStack>
        </Box>
      </SimpleGrid>
    </Box>
  );
}

export default Home;
