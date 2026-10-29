import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dark, light } from '../theme';
import { DEMO_MODE, supabase } from '../lib/supabase';
import { DEMO_USERS, DEMO_PASSWORD, COURSES } from '../data/seed';
const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);
const STR = { en: { welcome:'Welcome back', learn:'Learn', arena:'Olympiad Arena', lab:'Innovation Lab', events:'Renaissance 2026', profile:'Profile', search:'Search courses, competitions, projects…' },
  bn: { welcome:'স্বাগতম', learn:'শিখুন', arena:'অলিম্পিয়াড এরিনা', lab:'ইনোভেশন ল্যাব', events:'রেনেসাঁ ২০২৬', profile:'প্রোফাইল', search:'কোর্স, প্রতিযোগিতা, প্রজেক্ট খুঁজুন…' } };
export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [lang, setLang] = useState('en');
  const [themeName, setThemeName] = useState('dark');
  const [enrolled, setEnrolled] = useState(['phy101','math101']);
  const [completedLessons, setCompletedLessons] = useState({ phy101: 7, math101: 11 });
  const [projects, setProjects] = useState([{ id:'p1', title:'Low-cost Water Purifier', category:'Environmental Innovation', stage:'Prototype', progress:0.55, status:'Draft' }]);
  const [registrations, setRegistrations] = useState(['c1']);
  const [notifications, setNotifications] = useState([{ id:'n1', title:'New assignment in Physics', read:false }, { id:'n2', title:'Physics Olympiad registration is open', read:false }]);
  const [quizHistory, setQuizHistory] = useState([]);
  const [audit, setAudit] = useState([{ id:'a1', action:'Demo seed loaded', by:'system', at:new Date().toISOString() }]);
  const [teacherApps, setTeacherApps] = useState([{ id:'t1', name:'Ayesha Rahman', subject:'Chemistry', status:'pending' }]);
  const [announcements, setAnnouncements] = useState([{ id:'an1', title:'The Renaissance 2026 divisions are live in the Event Hub', body:'Dates and rules are shown as “to be confirmed” until organisers confirm them.' }]);
  useEffect(() => { (async () => { try { const raw = await AsyncStorage.getItem('nova-edu-state'); if (raw) { const s = JSON.parse(raw); setUser(s.user||null); setEnrolled(s.enrolled||enrolled); setProjects(s.projects||projects); setRegistrations(s.registrations||registrations); setQuizHistory(s.quizHistory||[]); } } catch {} })(); }, []);
  useEffect(() => { AsyncStorage.setItem('nova-edu-state', JSON.stringify({ user, enrolled, projects, registrations, quizHistory })).catch(()=>{}); }, [user, enrolled, projects, registrations, quizHistory]);
  const theme = themeName === 'dark' ? dark : light;
  const t = STR[lang];
  async function login(email, password) {
    if (!DEMO_MODE && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw new Error(error.message);
      // Role is resolved from profiles/role_assignments in SQL, never from a client field.
      const demo = DEMO_USERS.find(u => u.email === email.toLowerCase());
      setUser(demo || { id: data.user.id, name: email.split('@')[0], email, role:'student' });
      return demo || { role:'student' };
    }
    const found = DEMO_USERS.find(u => u.email === email.toLowerCase());
    if (!found || password !== DEMO_PASSWORD) throw new Error('Invalid demo login. Use student@demo.nova / teacher@demo.nova / admin@demo.nova with password demo1234');
    setUser(found); return found;
  }
  async function register(name, email, password, requestedRole) {
    if (password.length < 8) throw new Error('Password must be at least 8 characters.');
    // SECURITY: registration can never grant teacher/admin directly.
    // Teacher requests go to teacherApps for admin approval; admin is provisioned server-side only.
    if (requestedRole === 'teacher') { setTeacherApps(a => [...a, { id:'t'+Date.now(), name, subject:'To be assigned', status:'pending' }]); }
    if (!DEMO_MODE && supabase) { const { error } = await supabase.auth.signUp({ email, password }); if (error) throw error; }
    const u = { id:'u'+Date.now(), name, email, role:'student' }; setUser(u); return u;
  }
  function logout() { if (supabase) supabase.auth.signOut().catch(()=>{}); setUser(null); }
  function logAudit(action, by) { setAudit(a => [{ id:'a'+Date.now(), action, by, at:new Date().toISOString() }, ...a]); }
  const value = useMemo(() => ({ user, lang, setLang, theme, themeName, setThemeName, t, DEMO_MODE, login, register, logout, enrolled, setEnrolled, completedLessons, setCompletedLessons, projects, setProjects, registrations, setRegistrations, notifications, setNotifications, quizHistory, setQuizHistory, audit, logAudit, teacherApps, setTeacherApps, announcements, setAnnouncements, courses: COURSES }), [user, lang, themeName, enrolled, completedLessons, projects, registrations, notifications, quizHistory, audit, teacherApps, announcements]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
