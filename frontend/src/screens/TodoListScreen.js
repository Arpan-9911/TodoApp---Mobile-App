import { useEffect, useState } from 'react';
import { FlatList, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateTodo, deleteTodo } from '../actions/todoActions.js';

export default function TodoListScreen() {
  const todos = useSelector(state => state.todo);
  const dispatch = useDispatch();

  const toggleTodo = async (id) => {
    try {
      await dispatch(updateTodo(id));
    } catch (error) {
      Alert.alert("Error", "Failed to update todo");
    }
  };

  const handleDelete = async (id) => {
    Alert.alert(
      'Delete Todo',
      'Are you sure you want to delete this todo?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await dispatch(deleteTodo(id));
            } catch (error) {
              Alert.alert('Error', 'Failed to delete todo');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1, padding: 20, paddingTop: 40 }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 10 }}>
        Todo List
      </Text>
      <FlatList
        data={todos}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 12,
              marginVertical: 6,
              borderRadius: 10,
              backgroundColor: item.completed ? '#d4edda' : '#f8d7da',
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              {item.title}
            </Text>
            <Text style={{ fontSize: 14, color: '#555', marginBottom: 4 }}>
              {item.description}
            </Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity
                onPress={() => toggleTodo(item._id)}
                style={{
                  backgroundColor: item.completed ? '#28a745' : '#dc3545',
                  paddingVertical: 6,
                  paddingHorizontal: 16,
                  borderRadius: 6,
                }}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                  {item.completed ? 'Undo' : 'Complete'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleDelete(item._id)}
                style={{
                  backgroundColor: '#ff4444',
                  paddingVertical: 6,
                  paddingHorizontal: 16,
                  borderRadius: 6,
                }}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text>No todos yet</Text>
        )}
      />
    </View>
  );
}
