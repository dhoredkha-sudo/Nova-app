import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useApp } from '../context/AppContext';
import { Card, Title, Sub, Btn, Progress, Empty } from '../components/ui';
function Guard({ role, children }) { const { user, theme } = useApp(); if(!user) return <ScrollView style={{flex:1,backgroundColor:theme.bg}} contentContainerStyle={{padding:16}}><Title>Please login</Title><Sub>Use a demo account to view this dashboard.</Sub></ScrollView>; if(user.role!==role) return <ScrollView style={{flex:1,backgroundColor:theme.bg}} contentContainerStyle={{padding:16}}><Title>403 — Access denied</Title><Sub>You do not have permission for this dashboard. Your role is {user.role}.</Sub></ScrollView>; return children; }
export function StudentDashboard({ navigation }) {
  const { theme, user, courses, enrolled, completedLessons, quizHistory, projects, registrations, notifications } = useApp();
  const totalDone = Object.values(completedLessons).reduce((a,b)=>a+b,0);
  return <Guard role="student"><ScrollView style={{flex:1,backgroundColor:theme.bg}} contentContainerStyle={{padding:16,paddingBottom:40}}>
    <Title>Hi, {user?.name || 'Student'} 👋</Title><Sub>Streak: 5 days • Completed lessons: {totalDone} • Quiz attempts: {quizHistory.length}</Sub>
    <View style={{flexDirection:'row',gap:10,marginTop:12}}><Card style={{flex:1}}><Title>62%</Title><Sub>Overall progress</Sub></Card><Card style={{flex:1}}><Title>{enrolled.length}</Title><Sub>Enrolled courses</Sub></Card></View>
    <Title style={{marginTop:20}}>My Mission Today</Title>
    <Card style={{marginTop:10}}><Sub>• Complete 2 Physics lessons{'\n'}• Revise Algebra practice{'\n'}• Update your Innovation Lab project</Sub></Card>
    <Title style={{marginTop:20}}>Continue Learning</Title>
    {courses.filter(c=>enrolled.includes(c.id)).map(c=><Card key={c.id} style={{marginTop:10}}><Title style={{fontSize:17}}>{c.title}</Title><Progress value={c.progress} /><Btn title="Continue" onPress={()=>navigation.navigate('CourseDetail',{course:c})} /></Card>)}
    <Title style={{marginTop:20}}>My Projects</Title>{projects.length?projects.map(p=><Card key={p.id} style={{marginTop:10}}><Title style={{fontSize:17}}>{p.title}</Title><Sub>{p.category} • {p.stage} • {p.status}</Sub></Card>):<Empty text="No projects yet. Create one in Innovation Lab." />}
    <Title style={{marginTop:20}}>Recent Results</Title>{quizHistory.length?quizHistory.map((h,i)=><Card key={i} style={{marginTop:10}}><Sub>Quiz • Score {h.score} • {h.correct}/{h.total} correct</Sub></Card>):<Empty text="No quiz results yet. Try Olympiad Arena practice mode." />}
    <Btn title="Olympiad Arena" onPress={()=>navigation.navigate('Arena')} /><Btn title="Innovation Lab" variant="ghost" onPress={()=>navigation.navigate('Lab')} />
  </ScrollView></Guard>;
}
export function TeacherDashboard({ navigation }) {
  const { theme, user, courses, teacherApps, announcements } = useApp();
  return <Guard role="teacher"><ScrollView style={{flex:1,backgroundColor:theme.bg}} contentContainerStyle={{padding:16,paddingBottom:40}}>
    <Title>Teacher Dashboard</Title><Sub>{user?.name} • {user?.class} • You can manage only your own courses, assignments and mentees.</Sub>
    <Title style={{marginTop:20}}>My courses</Title>{courses.slice(0,3).map(c=><Card key={c.id} style={{marginTop:10}}><Title style={{fontSize:17}}>{c.title}</Title><Sub>{c.subject} • {c.lessons} lessons</Sub></Card>)}
    <Title style={{marginTop:20}}>Create a lesson (demo, saved locally)</Title><Card style={{marginTop:10}}><Sub>Lesson publishing, question banks, assignments and manual grading live in the teacher workspace. In demo mode, new lessons are added to the local course list only — with Supabase they are written to lessons with your teacher ID as owner.</Sub><Btn title="Publish sample lesson" onPress={()=>navigation.navigate('Learn')} /></Card>
    <Title style={{marginTop:20}}>Pending teacher applications (visible to teachers for transparency)</Title>{teacherApps.map(a=><Card key={a.id} style={{marginTop:10}}><Sub>{a.name} • {a.subject} • {a.status}</Sub></Card>)}
  </ScrollView></Guard>;
}
export function AdminDashboard({ navigation }) {
  const { theme, user, teacherApps, setTeacherApps, audit, logAudit, announcements, setAnnouncements } = useApp();
  return <Guard role="admin"><ScrollView style={{flex:1,backgroundColor:theme.bg}} contentContainerStyle={{padding:16,paddingBottom:40}}>
    <Title>Admin Dashboard</Title><Sub>{user?.name} • Full platform control is audited. Destructive actions require confirmation in production.</Sub>
    <View style={{flexDirection:'row',gap:10,marginTop:12}}><Card style={{flex:1}}><Title>3</Title><Sub>Demo users</Sub></Card><Card style={{flex:1}}><Title>{teacherApps.filter(a=>a.status==='pending').length}</Title><Sub>Pending teachers</Sub></Card></View>
    <Title style={{marginTop:20}}>Teacher applications</Title>{teacherApps.map(a=><Card key={a.id} style={{marginTop:10}}><Sub>{a.name} • {a.subject} • {a.status}</Sub>{a.status==='pending' && <View style={{flexDirection:'row',gap:8}}><Btn title="Approve" onPress={()=>{ setTeacherApps(teacherApps.map(x=>x.id===a.id?{...x,status:'approved'}:x)); logAudit(`Approved teacher application: ${a.name}`, user.name); }} /><Btn title="Reject" variant="ghost" onPress={()=>{ setTeacherApps(teacherApps.map(x=>x.id===a.id?{...x,status:'rejected'}:x)); logAudit(`Rejected teacher application: ${a.name}`, user.name); }} /></View>}</Card>)}
    <Title style={{marginTop:20}}>Recent admin activity (audit log)</Title>{audit.slice(0,8).map(a=><Card key={a.id} style={{marginTop:10}}><Sub>{a.action} — {a.by} — {new Date(a.at).toLocaleString()}</Sub></Card>)}
    <Title style={{marginTop:20}}>Platform settings</Title><Card style={{marginTop:10}}><Sub>Branding, maintenance mode, registration settings and homepage sections are stored in platform_settings in Supabase. In demo mode, changes are shown here only.</Sub><Btn title="Post announcement" onPress={()=>{ setAnnouncements([...announcements,{id:'an'+Date.now(),title:'Admin announcement',body:'Posted from the Admin Dashboard (demo).'}]); logAudit('Posted announcement', user.name); }} /></Card>
  </ScrollView></Guard>;
}
