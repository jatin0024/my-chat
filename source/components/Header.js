// source/components/Header.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function Header({ title, onBack, rightIcon, onRightPress }) {
  return (
    <View style={styles.header}>
      {onBack ? (
        <TouchableOpacity onPress={onBack} style={styles.left}>
          <AntDesign name="arrowleft" size={22} color="#fff" />
        </TouchableOpacity>
      ) : <View style={styles.left} />}

      <Text style={styles.title}>{title}</Text>

      {rightIcon ? (
        <TouchableOpacity onPress={onRightPress} style={styles.right}>
          {rightIcon}
        </TouchableOpacity>
      ) : <View style={styles.right} />}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 72,
    paddingTop: 30,
    backgroundColor: '#6C63FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700'
  },
  left: { width: 40 },
  right: { width: 40, alignItems: 'flex-end' }
});
