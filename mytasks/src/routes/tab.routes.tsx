import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { Home } from '../screens/Home';
import { Deleted } from '../screens/Deleted';

type IconTabName = 'home' | 'archive'; // FIRST CHANGE


const TabBarIcon = ({ name }: { name: IconTabName }) => { // SECOND CHANGE
  return ({ color, size }: { color: string; size: number }) => (
    <Feather name={name} color={color} size={size} />
  );
};


const screenOptions = { // THIRD CHANGE
  headerShown: false,
  tabBarActiveTintColor: '#eba417',
  tabBarInactiveTintColor: '#B0B0B0',
  tabBarStyle: {
    backgroundColor: '#121214',
    borderTopWidth: 0,
  },
};

const Tab = createBottomTabNavigator();

export function TabRoutes() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: TabBarIcon({ name: 'home' }),
          tabBarLabel: 'tasks',
        }}
      />
      <Tab.Screen
        name="deleted"
        component={Deleted}
        options={{
          tabBarIcon: TabBarIcon({ name: 'archive' }),
          tabBarLabel: 'deleted tasks',
        }}
      />
    </Tab.Navigator>
  );
}
