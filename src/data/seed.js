export const SUBJECTS = ['Physics','Chemistry','Biology','Mathematics','ICT','Astronomy','Robotics','English','General Knowledge','Islamic History','Business Studies','Creative Arts'];
export const COURSES = [
  { id:'phy101', subject:'Physics', title:'Mechanics Foundations', level:'Beginner', lessons:12, duration:'6h 20m', progress:0.62 },
  { id:'chem101', subject:'Chemistry', title:'Moles, Acids & Reactions', level:'Beginner', lessons:10, duration:'5h 10m', progress:0.34 },
  { id:'bio101', subject:'Biology', title:'Cell Biology in Depth', level:'Intermediate', lessons:14, duration:'7h 05m', progress:0.48 },
  { id:'math101', subject:'Mathematics', title:'Algebra & Problem Solving', level:'Intermediate', lessons:16, duration:'8h 00m', progress:0.71 },
  { id:'astro101', subject:'Astronomy', title:'Stars, Galaxies & Telescopes', level:'Beginner', lessons:9, duration:'4h 40m', progress:0.22 },
  { id:'robot101', subject:'Robotics', title:'Line-Following Robots', level:'Intermediate', lessons:11, duration:'6h 30m', progress:0.15 },
];
export const QUIZ_QUESTIONS = [
  { id:'q1', topic:'Physics', text:'Which quantity is conserved in an isolated system?', options:['Momentum','Velocity','Force','Power'], answer:0, explanation:'In an isolated system total momentum is conserved.' },
  { id:'q2', topic:'Physics', text:'Speed of light in vacuum is approximately?', options:['3 x 10^6 m/s','3 x 10^8 m/s','3 x 10^5 m/s','1.5 x 10^8 m/s'], answer:1, explanation:'c = 299,792,458 m/s, about 3 x 10^8 m/s.' },
  { id:'q3', topic:'Mathematics', text:'What is the derivative of x^2?', options:['x','2x','x^2','2'], answer:1, explanation:'d/dx x^2 = 2x.' },
  { id:'q4', topic:'Chemistry', text:'pH of a neutral solution at 25°C is?', options:['0','5','7','14'], answer:2, explanation:'Neutral pH is 7 at 25°C.' },
  { id:'q5', topic:'Astronomy', text:'Which planet is known as the Red Planet?', options:['Venus','Jupiter','Mars','Saturn'], answer:2, explanation:'Mars appears red due to iron oxide on its surface.' },
  { id:'q6', topic:'Biology', text:'The powerhouse of the cell is the?', options:['Nucleus','Ribosome','Mitochondrion','Golgi body'], answer:2, explanation:'Mitochondria produce most cellular ATP.' },
  { id:'q7', topic:'ICT', text:'What does CPU stand for?', options:['Central Processing Unit','Computer Personal Unit','Central Program Utility','Control Processing Unit'], answer:0, explanation:'CPU = Central Processing Unit.' },
  { id:'q8', topic:'Mathematics', text:'15% of 200 is?', options:['20','25','30','35'], answer:2, explanation:'0.15 x 200 = 30.' },
  { id:'q9', topic:'General Knowledge', text:'Which gas do plants absorb for photosynthesis?', options:['Oxygen','Nitrogen','Carbon dioxide','Hydrogen'], answer:2, explanation:'Plants absorb CO2 and release oxygen.' },
  { id:'q10', topic:'Physics', text:'Unit of electric current is?', options:['Volt','Ohm','Ampere','Watt'], answer:2, explanation:'Current is measured in amperes.' },
];
export const COMPETITIONS = [
  { id:'c1', name:'Physics Olympiad', category:'Olympiad', division:'The Athenaeum', status:'Open', date:'To be confirmed by organisers' },
  { id:'c2', name:'Mathematics Olympiad', category:'Olympiad', division:'The Athenaeum', status:'Open', date:'To be confirmed by organisers' },
  { id:'c3', name:'Robotics Olympiad', category:'Olympiad', division:'The Athenaeum', status:'Coming soon', date:'To be confirmed by organisers' },
  { id:'c4', name:'Science Wall Magazine', category:'Exhibition', division:'The Chronicle', status:'Open', date:'To be confirmed by organisers' },
  { id:'c5', name:'Asian Parliamentary Debate', category:'Debate', division:'The Expression', status:'Open', date:'To be confirmed by organisers' },
  { id:'c6', name:'Line-Following Robot', category:'Robotics', division:'The Odyssey', status:'Open', date:'To be confirmed by organisers' },
  { id:'c7', name:'Programming Contest', category:'Coding', division:'The Odyssey', status:'Open', date:'To be confirmed by organisers' },
  { id:'c8', name:'Project Exhibition', category:'Innovation', division:'The Genesis', status:'Open', date:'To be confirmed by organisers' },
];
export const RENAISSANCE_DIVISIONS = [
  { id:'genesis', name:'I. The Genesis', items:['Project Exhibition','Idea and Start-up Exhibition','Young Innovators'] },
  { id:'chronicle', name:'II. The Chronicle', items:['Science Wall Magazine','Business Wall Magazine','History Wall Magazine','Junior Wall Magazine','Art Exhibition','Calligraphy Exhibition','Scrapbook Display','Astrography','Photography','Open-Themed Illustration','Meme Contest'] },
  { id:'expression', name:'III. The Expression', items:['Asian Parliamentary Debate','Public Speaking','Extempore Speech','Research/Idea Presentation','Poetry Writing and Recitation','Senior and Junior Art Competition','Storytelling','Creative Writing'] },
  { id:'athenaeum', name:'IV. The Athenaeum', items:['Academic Olympiads','Science and General Knowledge Quizzes','Team-Based Quiz','Other configured academic competitions'] },
  { id:'odyssey', name:'V. The Odyssey', items:['Line-Following Robot','Programming Contest','Mini Sumo',"Rubik's Cube Solving",'Treasure Hunt','FC 26','E-Football Mobile'] },
];
export const DEMO_USERS = [
  { id:'u1', name:'Demo Student', email:'student@demo.nova', role:'student', class:'Class 10' },
  { id:'u2', name:'Demo Teacher', email:'teacher@demo.nova', role:'teacher', class:'Physics' },
  { id:'u3', name:'Demo Admin', email:'admin@demo.nova', role:'admin', class:'Platform' },
];
export const DEMO_PASSWORD = 'demo1234';
