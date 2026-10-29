import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useApp } from '../context/AppContext';
import { Card, Title, Sub, Btn, Input, Progress, Empty } from '../components/ui';
import { SUBJECTS } from '../data/seed';
export function LearnScreen({ navigation }) {
  const { theme, courses, enrolled, setEnrolled, t } = useApp(); const [q,setQ]=useState(''); const [subject,setSubject]=useState('All');
  const list = courses.filter(c => (subject==='All'||c.subject===subject) && (c.title.toLowerCase().includes(q.toLowerCase())||c.subject.toLowerCase().includes(q.toLowerCase())));
  return <ScrollView style={{flex:1,backgroundColor:theme.bg}} contentContainerStyle={{padding:16,paddingBottom:40}}><Title>{t.learn}</Title><Input value={q} onChangeText={setQ} placeholder={t.search} />
  <View style={{flexDirection:'row',flexWrap:'wrap',gap:8,marginVertical:8}}>{['All',...SUBJECTS.slice(0,7)].map(s=><TouchableOpacity key={s} onPress={()=>setSubject(s)} style={{padding:8,borderRadius:99,backgroundColor:subject===s?theme.primary:theme.elevated,borderWidth:1,borderColor:theme.border}}><Text style={{color:subject===s?'#030806':theme.text,fontWeight:'700'}}>{s}</Text></TouchableOpacity>)}</View>
  {list.length===0 && <Empty text="No courses match that search yet. Try another subject." />}
  {list.map(c=>{ const isEn=enrolled.includes(c.id); return <Card key={c.id} style={{marginTop:12}}><Title style={{fontSize:18}}>{c.title}</Title><Sub>{c.subject} • {c.level} • {c.lessons} lessons • {c.duration}</Sub><Progress value={c.progress} /><Btn title={isEn?'Continue learning':'Enrol'} onPress={()=>{ if(!isEn) setEnrolled([...enrolled,c.id]); navigation.navigate('CourseDetail',{course:c}); }} /></Card>; })}</ScrollView>;
}
export function CourseDetailScreen({ route, navigation }) {
  const { theme, completedLessons, setCompletedLessons, enrolled } = useApp(); const course = route.params?.course; if(!course) return <ScrollView style={{flex:1,backgroundColor:theme.bg}} contentContainerStyle={{padding:16}}><Empty text="Course not found." /></ScrollView>;
  const done = completedLessons[course.id]||0; const total = course.lessons;
  return <ScrollView style={{flex:1,backgroundColor:theme.bg}} contentContainerStyle={{padding:16}}><Title>{course.title}</Title><Sub>{course.subject} • {done} of {total} lessons completed</Sub><Progress value={done/total} />
  {Array.from({length:Math.min(total,6)}).map((_,i)=>{ const n=i+1; const isDone=n<=done; return <Card key={n} style={{marginTop:10}}><Title style={{fontSize:16}}>Lesson {n}: Core concept {n}</Title><Sub>{isDone?'Completed':'Not started yet'} • Lesson content is stored in the lessons table once a teacher publishes it.</Sub><Btn title={isDone?'Review lesson':'Mark as complete'} onPress={()=>setCompletedLessons({...completedLessons,[course.id]:Math.max(done,n)})} /></Card>; })}
  <Btn title="Back to Learn" variant="ghost" onPress={()=>navigation.goBack()} /></ScrollView>;
}
