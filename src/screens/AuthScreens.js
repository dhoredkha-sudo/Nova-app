import React, { useState } from 'react';
import { ScrollView, Text, Alert } from 'react-native';
import { useApp } from '../context/AppContext';
import { Card, Title, Sub, Btn, Input } from '../components/ui';
export function LoginScreen({ navigation }) {
  const { theme, login } = useApp(); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [err,setErr]=useState('');
  async function go(){ try{ const u=await login(email.trim(),password); navigation.navigate(u.role==='admin'?'Admin':u.role==='teacher'?'Teacher':'Dashboard'); }catch(e){ setErr(e.message); } }
  return <ScrollView style={{flex:1,backgroundColor:theme.bg}} contentContainerStyle={{padding:16}}><Title>Login</Title><Sub>Demo accounts: student@demo.nova / teacher@demo.nova / admin@demo.nova — password demo1234</Sub>
  <Input value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" /><Input value={password} onChangeText={setPassword} placeholder="Password" secure />
  {err ? <Text style={{color:theme.danger,marginVertical:8}}>{err}</Text> : null}
  <Btn title="Login" onPress={go} /><Btn title="Create account" variant="ghost" onPress={()=>navigation.navigate('Register')} /><Btn title="Forgot password (Supabase reset in production)" variant="ghost" onPress={()=>Alert.alert('Password reset','With a real Supabase project, this sends a reset email via Supabase Auth. In demo mode, use a demo account.')} /></ScrollView>;
}
export function RegisterScreen({ navigation }) {
  const { theme, register } = useApp(); const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [wantTeacher,setWantTeacher]=useState(false); const [err,setErr]=useState('');
  async function go(){ try{ const u=await register(name,email,password,wantTeacher?'teacher':'student'); Alert.alert('Account created', wantTeacher ? 'Your teacher request was sent for admin approval. You are signed in as a student until approved.' : 'Welcome to NOVA EDU.'); navigation.navigate('Dashboard'); }catch(e){ setErr(e.message); } }
  return <ScrollView style={{flex:1,backgroundColor:theme.bg}} contentContainerStyle={{padding:16}}><Title>Register</Title><Sub>Students register directly. You cannot choose Admin — that role is provisioned server-side only.</Sub>
  <Input value={name} onChangeText={setName} placeholder="Full name" /><Input value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" /><Input value={password} onChangeText={setPassword} placeholder="Password (min 8 characters)" secure />
  {err ? <Text style={{color:theme.danger,marginVertical:8}}>{err}</Text> : null}
  <Btn title={wantTeacher ? 'Request teacher access (needs approval)' : 'Register as student'} onPress={go} /><Btn title="I am a teacher — request approval instead" variant="ghost" onPress={()=>setWantTeacher(!wantTeacher)} /><Btn title="Already have an account? Login" variant="ghost" onPress={()=>navigation.navigate('Login')} /></ScrollView>;
}
