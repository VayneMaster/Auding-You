import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import BrainWaker from './BrainWaker';
import ConnectTab from './Connect';
import TaskFarmer from './TaskFarmer';
import Taskling from './Taskling';
import WinsScreen from './Wins';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarLabelStyle: { fontSize: 12 },
        }}
      >
        <Tab.Screen name="Brain" component={BrainWaker} options={{ tabBarLabel: '🧩 Brain' }} />
        <Tab.Screen name="TaskFarmer" component={TaskFarmer} options={{ tabBarLabel: '🌿 Farm' }} />
        <Tab.Screen name="Taskling" component={Taskling} options={{ tabBarLabel: '🌼 Taskling' }} />
        <Tab.Screen name="Connect" component={ConnectTab} options={{ tabBarLabel: '🫂 Connect' }} />
        <Tab.Screen name="Wins" component={WinsScreen} options={{ tabBarLabel: '🏆 Wins' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
