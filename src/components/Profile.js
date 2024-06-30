import React, { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';

function Profile() {
  const [user] = useAuthState(auth);
  const [profile, setProfile] = useState(null);
  const db = getFirestore();

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        const docRef = doc(db, 'members', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        } else {
          console.error('No such document!');
        }
      };
      fetchProfile();
    }
  }, [user]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Heading>{profile.name}</Heading>
      <Text>Skill Level: {profile.skillLevel}</Text>
      <Text>Match Availability: {profile.availability}</Text>
      <Text>Current Status: {profile.status}</Text>
      <VStack spacing={4}>
        <Heading size="md">Match Insights</Heading>
        {/* Display match statistics here */}
        <Text>Total Matches: {profile.totalMatches}</Text>
        <Text>Wins: {profile.wins}</Text>
        <Text>Losses: {profile.losses}</Text>
      </VStack>
    </Box>
  );
}

export default Profile;