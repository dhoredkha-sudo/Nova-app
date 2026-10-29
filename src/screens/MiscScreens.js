import React, { useState } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { useApp } from '../context/AppContext';
import { Card, Title, Sub, Btn, Input, Empty } from '../components/ui';
import { COURSES, COMPETITIONS } from '../data/seed';
export function SearchScreen() {
  const { theme, t } = useApp(); const [q,setQ]=useState('');
  const all=[...COURSES.map(c=>({type:'Course',name:c.title,meta:c.subject})),...COMPETITIONS.map(c=>({type:'Competition',name:c.name,meta:c.division}))];
  const list=q?all.filter(x=>x.name.toLowerCase().includes(q.toLowerCase())):all;
  return <ScrollView style={{flex:1,backgroundColor:theme.bg}} contentContainerStyle={{padding:16}}><Title>Search</Title><Input value={q} onChangeText={setQ} placeholder={t.search} />{list.map((x,i)=><Card key={i} style={{marginTop:10}}><Sub>{x.type}</Sub><Title style={{fontSize:17}}>{x.name}</Title><Sub>{x.meta}</Sub></Card>)}{list.length===0 && <Empty text="Nothing found. Try another keyword." />}</ScrollView>;
}
export function NotificationsScreen() {
  const { theme, notifications, setNotifications } = useApp();
  return <ScrollView style={{flex:1,backgroundColor:theme.bg}} contentContainerStyle={{padding:16}}><Title>Notifications</Title><Btn title="Mark all as read" onPress={()=>setNotifications(notifications.map(n=>({...n,read:true})))} />{notifications.map(n=><Card key={n.id} style={{marginTop:10}}><Title style={{fontSize:16}}>{n.read?'• ':'● '}{n.title}</Title><Sub>{n.read?'Read':'Unread'}</Sub></Card>)}<Empty text="Course announcements, assignment reminders, deadlines, results and mentor feedback appear here." /></ScrollView>;
}
export function ProfileScreen({ navigation }) {
  const { theme, user, logout, quizHistory, projects } = useApp();
  return <ScrollView style={{flex:1,backgroundColor:theme.bg}} contentContainerStyle={{padding:16}}><Title>Profile</Title>{user ? <><Card><Title>{user.name}</Title><Sub>{user.email} • Role: {user.role} • {user.class||''}</Sub><Sub>Quiz attempts: {quizHistory.length} • Projects: {projects.length}</Sub><Sub>Achievements are awarded only for verified activity — demo badges below are illustrative: First Steps, Consistent Learner, Project Starter.</Sub></Card><Btn title="Logout" onPress={()=>{ logout(); navigation.navigate('Home'); }} /></> : <><Sub>You are not logged in.</Sub><Btn title="Login" onPress={()=>navigation.navigate('Login')} /></>}</ScrollView>;
}
export function SettingsScreen() {
  const { theme, themeName, setThemeName, lang, setLang, DEMO_MODE } = useApp();
  return <ScrollView style={{flex:1,backgroundColor:theme.bg}} contentContainerStyle={{padding:16}}><Title>Settings</Title><Card style={{marginTop:12}}><Title style={{fontSize:17}}>Theme</Title><Btn title={themeName==='dark'?'Switch to light theme':'Switch to dark theme'} onPress={()=>setThemeName(themeName==='dark'?'light':'dark')} /><Title style={{fontSize:17,marginTop:12}}>Language / ভাষা</Title><Btn title={lang==='en'?'বাংলা করুন':'Switch to English'} onPress={()=>setLang(lang==='en'?'bn':'en')} /><Sub>Reduced motion is respected by avoiding heavy animations in this build; system accessibility settings apply on device.</Sub><Sub>Backend: {DEMO_MODE?'Demo mode — replace .env placeholders':'Supabase connected'}</Sub></Card></ScrollView>;
}
export function AboutScreen() {
  const { theme } = useApp();
  return <ScrollView style={{flex:1,backgroundColor:theme.bg}} contentContainerStyle={{padding:16}}><Title>About NOVA EDU</Title><Sub>Learn • Build • Compete. A learning ecosystem for school and college students, teachers, mentors, science clubs and competition participants. This build does not guarantee competition success — it is optimised for originality, usability, technical quality and presentation.</Sub>
  <Card style={{marginTop:12}}><Image source={require('../../assets/developer-pic.png')} style={{width:72,height:72,borderRadius:36,marginBottom:10}} /><Title style={{fontSize:18}}>Developed by Azim R.</Title><Sub>Contact: azim4web@gmail.com</Sub><Sub>Photo: your photo, cropped for the About avatar. Full photo is also saved as assets/developer-photo.jpg.</Sub></Card>
  <Card style={{marginTop:12}}><Title style={{fontSize:17}}>Contact</Title><Sub>azim4web@gmail.com</Sub></Card></ScrollView>;
}
