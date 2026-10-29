import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { AppProvider, useApp } from './src/context/AppContext';
import HomeScreen from './src/screens/HomeScreen';
import { LoginScreen, RegisterScreen } from './src/screens/AuthScreens';
import { LearnScreen, CourseDetailScreen } from './src/screens/LearnScreens';
import { StudentDashboard, TeacherDashboard, AdminDashboard } from './src/screens/Dashboards';
import { ArenaScreen, QuizScreen } from './src/screens/ArenaScreens';
import { LabScreen, EventsScreen } from './src/screens/LabEventsScreens';
import { SearchScreen, NotificationsScreen, ProfileScreen, SettingsScreen, AboutScreen } from './src/screens/MiscScreens';
const Stack = createNativeStackNavigator(); const Tab = createBottomTabNavigator();
function Tabs() {
  const { theme, user } = useApp();
  return <Tab.Navigator screenOptions={{ headerStyle:{backgroundColor:theme.bg}, headerTintColor:theme.text, tabBarStyle:{backgroundColor:theme.surface,borderTopColor:theme.border}, tabBarActiveTintColor:theme.primary, tabBarInactiveTintColor:theme.muted }}>
    <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel:'Home' }} />
    <Tab.Screen name="Learn" component={LearnScreen} />
    <Tab.Screen name="Arena" component={ArenaScreen} />
    <Tab.Screen name="Lab" component={LabScreen} />
    <Tab.Screen name="Events" component={EventsScreen} />
    <Tab.Screen name="Dashboard" component={user?.role==='teacher'?TeacherDashboard:user?.role==='admin'?AdminDashboard:StudentDashboard} options={{ title: user?.role==='admin'?'Admin':user?.role==='teacher'?'Teacher':'Student' }} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>;
}
function Root() {
  const { theme } = useApp();
  return <NavigationContainer theme={{ dark:true, colors:{ primary:theme.primary, background:theme.bg, card:theme.surface, text:theme.text, border:theme.border, notification:theme.primary } }}>
    <StatusBar style="light" />
    <Stack.Navigator screenOptions={{ headerStyle:{backgroundColor:theme.bg}, headerTintColor:theme.text, contentStyle:{backgroundColor:theme.bg} }}>
      <Stack.Screen name="Main" component={Tabs} options={{ headerShown:false }} />
      <Stack.Screen name="Login" component={LoginScreen} /><Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="CourseDetail" component={CourseDetailScreen} options={{ title:'Course' }} />
      <Stack.Screen name="Quiz" component={QuizScreen} options={{ title:'Timed Quiz' }} />
      <Stack.Screen name="Search" component={SearchScreen} /><Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} /><Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="Teacher" component={TeacherDashboard} options={{ title:'Teacher' }} />
      <Stack.Screen name="Admin" component={AdminDashboard} options={{ title:'Admin' }} />
    </Stack.Navigator>
  </NavigationContainer>;
}
export default function App() { return <SafeAreaProvider><AppProvider><Root /></AppProvider></SafeAreaProvider>; }
