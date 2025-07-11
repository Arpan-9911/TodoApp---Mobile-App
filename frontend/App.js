import React, { useEffect, useState } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './src/store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { logout } from './src/actions/authActions';
import LoginScreen from './src/screens/LoginScreen';
import TodoListScreen from './src/screens/TodoListScreen';
import AddTodoScreen from './src/screens/AddTodoScreen';
import { Alert, View } from 'react-native';
import { fetchTodos } from './src/actions/todoActions';

const Tab = createBottomTabNavigator();

function LogoutScreen() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout());
  }, []);
  return null;
}

function MainApp() {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth?.data?.user?.email);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const restoreAuth = async () => {
      try {
        const profile = await AsyncStorage.getItem('profile');
        if (profile) {
          const parsed = JSON.parse(profile);
          dispatch({ type: 'AUTH', payload: parsed });
          dispatch(fetchTodos());
        }
      } catch (err) {
        Alert.alert('Error', 'Failed to restore authentication');
        console.error('Restore Auth Error:', err);
      } finally {
        setLoading(false);
      }
    };
    restoreAuth();
  }, []);

  useEffect(() => {
    if (email) {
      dispatch(fetchTodos());
    }
  }, [email]);
  if (loading) return null;
  if (!email) {
    return <LoginScreen />;
  }
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#fff',
          tabBarIcon: ({ color, focused }) => {
            let iconName;
            if (route.name === 'Todo List') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'Add Todo') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            } else if (route.name === 'Logout') {
              iconName = focused ? 'log-out' : 'log-out-outline';
            }
            return <Ionicons name={iconName} size={28} color={color} />;
          },
          tabBarStyle: {
            position: 'absolute',
            width: '95%',
            marginHorizontal: '2.5%',
            bottom: 10,
            borderRadius: 50,
            height: 60,
            backgroundColor: '#6200EE',
            paddingTop: 10,
            borderColor: '#6200EE',
            borderWidth: 1,
          },
        })}
      >
        <Tab.Screen name="Todo List" component={TodoListScreen} />
        <Tab.Screen name="Add Todo" component={AddTodoScreen} />
        <Tab.Screen name="Logout" component={LogoutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}
