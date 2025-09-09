// Main navigation component for CampusConnect

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import CommunitiesScreen from '../screens/CommunitiesScreen';
import EventsScreen from '../screens/EventsScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import CommunityDetailScreen from '../screens/CommunityDetailScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import ViralGrowthScreen from '../screens/ViralGrowthScreen';

// Create navigators
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

// Main tab navigator
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Communities') {
            iconName = 'people';
          } else if (route.name === 'Events') {
            iconName = 'event';
          } else if (route.name === 'Messages') {
            iconName = 'message';
          } else if (route.name === 'Viral') {
            iconName = 'trending-up';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2e6ff2',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Communities" component={CommunitiesScreen} />
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Viral" component={ViralGrowthScreen} options={{ title: 'Growth' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Auth stack for login/register
function AuthStackScreen() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

// Main app navigator with auth flow
function MainStack() {
  // For mock, we'll assume user is authenticated
  // In a real app, you would check authentication state
  const isAuthenticated = true;

  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <>
          <Stack.Screen 
            name="Main" 
            component={MainTabs} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="CommunityDetail" 
            component={CommunityDetailScreen} 
          />
          <Stack.Screen 
            name="EventDetail" 
            component={EventDetailScreen} 
          />
          <Stack.Screen 
            name="UserProfile" 
            component={UserProfileScreen} 
          />
        </>
      ) : (
        <Stack.Screen 
          name="Auth" 
          component={AuthStackScreen} 
          options={{ headerShown: false }} 
        />
      )}
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}