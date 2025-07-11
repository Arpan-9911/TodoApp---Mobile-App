import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  Alert,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import { useDispatch } from 'react-redux';
import { createTodo } from '../actions/todoActions';
import { useNavigation } from '@react-navigation/native';

export default function AddTodoScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleAdd = async () => {
    if (!title.trim()) return Alert.alert('Empty!', 'Please type a title');
    if (!description.trim()) return Alert.alert('Empty!', 'Please type a description');
    try {
      await dispatch(createTodo({ title, description }));
      Alert.alert('Success', 'Todo added successfully');
      setTitle('');
      setDescription('');
      Keyboard.dismiss();
      navigation.navigate('Todo List');
    } catch (error) {
      Alert.alert('Error', 'Failed to add todo');
      console.error('Add Todo Error:', error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, paddingTop: 40 }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 10 }}>
        Add Todo
      </Text>

      <TextInput
        placeholder="Enter a title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#aaa"
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 10,
          borderColor: '#aaa',
          borderRadius: 6,
          fontSize: 16,
        }}
      />
      <TextInput
        placeholder="Enter a description"
        value={description}
        onChangeText={setDescription}
        placeholderTextColor="#aaa"
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 10,
          borderColor: '#aaa',
          borderRadius: 6,
          fontSize: 16,
        }}
      />
      <TouchableOpacity
        onPress={handleAdd}
        style={{
          backgroundColor: '#6200EE',
          paddingVertical: 12,
          borderRadius: 6,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
          Add Todo
        </Text>
      </TouchableOpacity>
    </View>
  );
}
