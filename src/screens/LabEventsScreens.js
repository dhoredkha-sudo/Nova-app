import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useApp } from '../context/AppContext';
import { Card, Title, Sub, Btn, Input, Empty } from '../components/ui';
import { RENAISSANCE_DIVISIONS, COMPETITIONS } from '../data/seed';
const STAGES=['Idea','Research','Prototype','Testing','Documentation','Presentation','Submission','Evaluation'];
export function LabScreen({ navigation }) {
  const { theme, projects, setProjects, user } = useApp(); const [title,setTitle]=useState(''); const [cat,setCat]=useState('Science Project Exhibition');
  return <ScrollView style={{flex:1,backgroundColor:theme.bg}} contentContainerStyle={{padding:16,paddingBottom:40}}><Title>Innovation Lab</Title><Sub>Project lifecycle: {STAGES.join(' → ')}</Sub>
  <Card style={{marginTop:12}}><Title style={{fontSize:17}}>Create project</Title><Input value={title} onChangeText={setTitle} placeholder="Project title" /><Input value={cat} onChangeText={setCat} placeholder="Category" /><Btn title="Save draft" onPress={()=>{ if(!title.trim()) return; setProjects([...projects,{id:'p'+Date.now(),title,category:cat,stage:'Idea',progress:0.1,status:'Draft'}]); setTitle(''); }} /></Card>
  {projects.map(p=><Card key={p.id} style={{marginTop:12}}><Title style={{fontSize:17}}>{p.title}</Title><Sub>{p.category} • Stage: {p.stage} • Status: {p.status}</Sub><Sub>Mentor feedback (demo): Focus on a clear problem statement and a testable prototype plan.</Sub><Btn title="Advance stage" onPress={()=>{ const i=STAGES.indexOf(p.stage); const next=STAGES[Math.min(STAGES.length-1,i+1)]; setProjects(projects.map(x=>x.id===p.id?{...x,stage:next,progress:Math.min(1,(i+2)/STAGES.length),status:next==='Submission'?'Submitted':x.status}:x)); }} /></Card>)}
  {!user && <Sub>Login to save projects to your account. In demo mode, projects are stored on this device.</Sub>}</ScrollView>;
}
export function EventsScreen({ navigation }) {
  const { theme, registrations, setRegistrations } = useApp(); const [open,setOpen]=useState('genesis');
  return <ScrollView style={{flex:1,backgroundColor:theme.bg}} contentContainerStyle={{padding:16,paddingBottom:40}}><Title>The Renaissance 2026</Title><Sub>Five divisions. No event date or rule is shown as confirmed unless organisers confirm it. Free Fire and other gaming modules are included only if officially authorised and permitted.</Sub>
  {RENAISSANCE_DIVISIONS.map(d=><Card key={d.id} style={{marginTop:12}}><TouchableOpacity onPress={()=>setOpen(open===d.id?null:d.id)}><Title style={{fontSize:18}}>{d.name}</Title></TouchableOpacity>{open===d.id && d.items.map(it=><Sub key={it}>• {it}</Sub>)}</Card>)}
  <Title style={{marginTop:20}}>Competitions & registrations</Title>{COMPETITIONS.map(c=>{ const reg=registrations.includes(c.id); return <Card key={c.id} style={{marginTop:10}}><Title style={{fontSize:17}}>{c.name}</Title><Sub>{c.division} • {c.status} • {c.date}</Sub><Btn title={reg?'Registered ✓':'Register'} onPress={()=>setRegistrations(reg?registrations.filter(x=>x!==c.id):[...registrations,c.id])} /></Card>; })}</ScrollView>;
}
