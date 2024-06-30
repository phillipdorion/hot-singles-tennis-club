import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebaseConfig';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

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
    <div>
      <h1>{profile.name}</h1>
      <p>Skill Level: {profile.skillLevel}</p>
      <p>Match Availability: {profile.availability}</p>
      <p>Current Status: {profile.status}</p>
      {/* Add other profile details as needed */}
    </div>
  );
}

export default Profile;