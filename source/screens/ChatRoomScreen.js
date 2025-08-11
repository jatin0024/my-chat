import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { auth, db } from '../firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import Header from '../components/Header';

export default function ChatRoomScreen({ route, navigation }) {
  const { roomName } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({ title: roomName });
  }, [navigation, roomName]);

  // Fetch messages in real-time
  useEffect(() => {
    const q = query(
      collection(db, 'rooms', roomName, 'messages'),
      orderBy('createdAt', 'asc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, [roomName]);

  const sendMessage = async () => {
    if (text.trim().length === 0) return;
    await addDoc(collection(db, 'rooms', roomName, 'messages'), {
      text,
      createdAt: serverTimestamp(),
      user: {
        uid: auth.currentUser.uid,
        email: auth.currentUser.email,
      }
    });
    setText('');
  };

  const renderItem = ({ item }) => {
    const isCurrentUser = item.user?.uid === auth.currentUser?.uid;
    return (
      <View style={[styles.message, isCurrentUser ? styles.myMessage : styles.otherMessage]}>
        <Text style={styles.messageUser}>{item.user?.email}</Text>
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
    >
      <Header title={roomName} onBack={() => navigation.goBack()} />
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 10 }}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Type a message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  message: { padding: 10, borderRadius: 8, marginBottom: 8, maxWidth: '80%' },
  myMessage: { backgroundColor: '#DCF8C6', alignSelf: 'flex-end' },
  otherMessage: { backgroundColor: '#EEE', alignSelf: 'flex-start' },
  messageUser: { fontSize: 10, color: '#555' },
  messageText: { fontSize: 16 },
  inputContainer: { flexDirection: 'row', padding: 10, borderTopWidth: 1, borderColor: '#ddd' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 20, paddingHorizontal: 15, marginRight: 10 },
  sendButton: { backgroundColor: '#6C63FF', paddingHorizontal: 20, justifyContent: 'center', borderRadius: 20 },
});
