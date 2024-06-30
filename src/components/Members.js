import React, { useEffect, useState } from 'react';
import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function Members() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const querySnapshot = await getDocs(collection(db, 'members'));
      setMembers(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchMembers();
  }, []);

  return (
    <Box maxW="md" mx="auto" mt={8}>
      <Heading as="h2" size="lg" mb={4}>Members</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {members.map((member) => (
          <Box key={member.id} p={5} shadow="md" borderWidth="1px">
            <Text>Name: {member.name}</Text>
            <Text>Email: {member.email}</Text>
            <Text>Phone: {member.phone}</Text>
            <Text>Skill Level: {member.skillLevel}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default Members;