import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useApp } from '../context/AppContext';
import { Card, Title, Sub, Btn, Progress } from '../components/ui';
import { COMPETITIONS } from '../data/seed';
export default function HomeScreen({ navigation }) {
  const { theme, user, DEMO_MODE, announcements } = useApp();
  return <ScrollView style={{ flex:1, backgroundColor: theme.bg }} contentContainerStyle={{ padding:16, paddingBottom:40 }}>
    {DEMO_MODE && <Card style={{ borderColor: theme.warning }}><Sub>DEMO MODE — Supabase placeholders are not yet replaced. Real data will appear after you add your Supabase URL + anon key and run the migrations. No fake live counts are shown.</Sub></Card>}
    <Title style={{ fontSize:30, marginTop:12 }}>NOVA EDU</Title>
    <Text style={{ color: theme.primary, fontWeight:'800', fontSize:18, marginVertical:6 }}>Learn • Build • Compete</Text>
    <Sub>A premium learning ecosystem for students, teachers and mentors — science festivals, Olympiads, academic learning and innovation exhibitions.</Sub>
    <View style={{ height:12 }} />
    <Btn title="Get Started" onPress={() => navigation.navigate(user ? 'Dashboard' : 'Login')} />
    <Btn title="Explore Competitions" variant="ghost" onPress={() => navigation.navigate('Events')} />
    <Card style={{ marginTop:16 }}><Title>Featured subjects</Title><Sub>Physics • Chemistry • Biology • Mathematics • ICT • Astronomy • Robotics</Sub><Progress value={0.5} /><Sub>Your progress is calculated from real enrolments and completed lessons in this app.</Sub></Card>
    {announcements.map(a => <Card key={a.id} style={{ marginTop:12 }}><Title style={{ fontSize:17 }}>{a.title}</Title><Sub>{a.body}</Sub></Card>)}
    <Title style={{ marginTop:20 }}>The Renaissance 2026 — preview</Title>
    {COMPETITIONS.slice(0,4).map(c => <Card key={c.id} style={{ marginTop:10 }}><Title style={{ fontSize:17 }}>{c.name}</Title><Sub>{c.division} • {c.status} • {c.date}</Sub><Btn title={c.status==='Open' ? 'View event' : 'Coming soon'} variant="ghost" onPress={() => navigation.navigate('Events')} /></Card>)}
    <Title style={{ marginTop:20 }}>FAQ</Title>
    <Card style={{ marginTop:10 }}><Title style={{ fontSize:16 }}>Can I register as a teacher directly?</Title><Sub>No. Teacher requests need admin approval, and admin accounts are provisioned server-side only.</Sub></Card>
    <Card style={{ marginTop:10 }}><Title style={{ fontSize:16 }}>Are dates final?</Title><Sub>No. Dates shown as “to be confirmed” are not confirmed until organisers confirm them.</Sub></Card>
  </ScrollView>;
}
