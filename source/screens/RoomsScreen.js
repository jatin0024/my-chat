// source/screens/RoomsScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Share } from 'react-native';
import { signOut } from "firebase/auth";
import { auth, db } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import Header from '../components/Header';

export default function RoomsScreen({ navigation }) {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'rooms'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, snapshot => {
      setRooms(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    navigation.replace('Login');
  };

  const createRoom = async () => {
    const name = `Room ${new Date().toLocaleTimeString()}`;
    const docRef = await addDoc(collection(db, 'rooms'), {
      name,
      createdAt: serverTimestamp()
    });

    // Generate a deep link
    const link = `mychatapp://join/${docRef.id}`;
    await Share.share({
      message: `Join my chat room: ${link}`
    });
  };

  const shareRoom = async (roomId) => {
    const link = `mychatapp://join/${roomId}`;
    await Share.share({
      message: `Join my chat room: ${link}`
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Chat Rooms" onBack={handleSignOut} />
      <TouchableOpacity style={styles.createButton} onPress={createRoom}>
        <Text style={styles.createButtonText}>+ Create Room & Share Link</Text>
      </TouchableOpacity>
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.roomRow}>
            <TouchableOpacity
              style={styles.roomItem}
              onPress={() => navigation.navigate('Chat', { roomId: item.id, roomName: item.name })}
            >
              <Text style={styles.roomName}>{item.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={() => shareRoom(item.id)}
            >
              <Text style={styles.shareButtonText}>Invite</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  createButton: {
    backgroundColor: '#6C63FF',
    padding: 12,
    alignItems: 'center'
  },
  createButtonText: { color: '#fff', fontSize: 16 },
  roomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd'
  },
  roomItem: {
    paddingVertical: 16,
    flex: 1
  },
  roomName: { fontSize: 18 },
  shareButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 14
  }
});
