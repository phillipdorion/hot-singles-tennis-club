import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

function Members() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const querySnapshot = await getDocs(collection(db, 'members'));
      const membersData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setMembers(membersData);
    };

    fetchMembers();
  }, []);

  return (
    <div>
      <h1>Members</h1>
      <ul>
        {members.map((member) => (
          <li key={member.id}>
            {member.name} - {member.skillLevel}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Members;