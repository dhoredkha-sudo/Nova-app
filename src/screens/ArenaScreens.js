import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useApp } from '../context/AppContext';
import { Card, Title, Sub, Btn, Empty } from '../components/ui';
import { COMPETITIONS, QUIZ_QUESTIONS } from '../data/seed';
import { scoreAttempt } from '../lib/scoring';
export function ArenaScreen({ navigation }) {
  const { theme, quizHistory } = useApp();
  return <ScrollView style={{flex:1,backgroundColor:theme.bg}} contentContainerStyle={{padding:16,paddingBottom:40}}><Title>Olympiad Arena</Title><Sub>Timed practice, mock tests and scheduled competitions. Hints are disabled in restricted examinations. Correct answers are never sent to the client before submission in the Supabase version — practice questions here are local demo questions.</Sub>
  <Btn title="Start timed practice (10 questions, 10 min)" onPress={()=>navigation.navigate('Quiz')} />
  <Title style={{marginTop:20}}>Categories</Title>{COMPETITIONS.map(c=><Card key={c.id} style={{marginTop:10}}><Title style={{fontSize:17}}>{c.name}</Title><Sub>{c.category} • {c.division} • {c.status}</Sub></Card>)}
  <Title style={{marginTop:20}}>Performance history</Title>{quizHistory.length?quizHistory.map((h,i)=><Card key={i} style={{marginTop:10}}><Sub>Attempt {i+1} • Score {h.score} • {h.correct}/{h.total} correct • Accuracy {Math.round(h.correct/h.total*100)}%</Sub></Card>):<Empty text="No attempts yet." />}</ScrollView>;
}
export function QuizScreen({ navigation }) {
  const { theme, setQuizHistory, quizHistory } = useApp(); const [idx,setIdx]=useState(0); const [answers,setAnswers]=useState({}); const [seconds,setSeconds]=useState(600); const [done,setDone]=useState(null);
  useEffect(()=>{ if(done) return; const t=setInterval(()=>setSeconds(s=>{ if(s<=1){ clearInterval(t); finish(); return 0; } return s-1; }),1000); return ()=>clearInterval(t); },[done]);
  function finish(){ const r=scoreAttempt(answers,QUIZ_QUESTIONS,{correct:4,negative:1}); const rec={...r,submittedAt:new Date().toISOString(),accuracy:r.total?r.correct/r.total:0}; setQuizHistory([...quizHistory,rec]); setDone(rec); }
  if(done) return <ScrollView style={{flex:1,backgroundColor:theme.bg}} contentContainerStyle={{padding:16}}><Title>Result</Title><Card style={{marginTop:12}}><Title>Score: {done.score}</Title><Sub>Correct {done.correct} • Wrong {done.wrong} • Skipped {done.skipped} • Total {done.total}</Sub><Sub>Marking: +4 correct, -1 wrong. This is calculated locally for practice; production scoring is re-validated server-side.</Sub></Card>
  <Title style={{marginTop:20}}>Review</Title>{QUIZ_QUESTIONS.map(q=><Card key={q.id} style={{marginTop:10}}><Sub>{q.text}</Sub><Sub>Your answer: {answers[q.id]!==undefined? q.options[answers[q.id]] : 'Skipped'} • Correct: {q.options[q.answer]}</Sub><Sub>{q.explanation}</Sub></Card>)}
  <Btn title="Back to Arena" onPress={()=>navigation.navigate('Arena')} /></ScrollView>;
  const q=QUIZ_QUESTIONS[idx]; const mm=Math.floor(seconds/60); const ss=String(seconds%60).padStart(2,'0');
  return <ScrollView style={{flex:1,backgroundColor:theme.bg}} contentContainerStyle={{padding:16}}><Title>Practice Quiz</Title><Sub>Time left: {mm}:{ss} • Question {idx+1} of {QUIZ_QUESTIONS.length} • {q.topic}</Sub>
  <Card style={{marginTop:12}}><Title style={{fontSize:18}}>{q.text}</Title>{q.options.map((o,i)=><TouchableOpacity key={i} onPress={()=>setAnswers({...answers,[q.id]:i})} style={{padding:12,marginTop:8,borderRadius:12,backgroundColor:answers[q.id]===i?theme.primary:theme.surface,borderWidth:1,borderColor:theme.border}}><Text style={{color:answers[q.id]===i?'#030806':theme.text,fontWeight:'700'}}>{o}</Text></TouchableOpacity>)}</Card>
  <View style={{flexDirection:'row',gap:10,marginTop:12}}><Btn title="Previous" variant="ghost" onPress={()=>setIdx(Math.max(0,idx-1))} />{idx<QUIZ_QUESTIONS.length-1 ? <Btn title="Next" onPress={()=>setIdx(idx+1)} /> : <Btn title="Submit" onPress={finish} />}</View></ScrollView>;
}
