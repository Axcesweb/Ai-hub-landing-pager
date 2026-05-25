import Link from 'next/link';
import { courses } from '@/lib/mock-data';

export default function LessonPage({ params }:{ params:{courseId:string;lessonId:string}}){
  const course = courses.find(c=>c.id===params.courseId) || courses[0];
  const lessons = course.modules.flatMap(m=>m.lessons);
  const idx = lessons.findIndex(l=>l.id===params.lessonId);
  const lesson = lessons[idx] || lessons[0];
  const next = lessons[idx+1];
  return <main className='container grid'><article className='card'><h1>{lesson.title}</h1><p className='muted'>{lesson.type.toUpperCase()} • {lesson.duration}</p>{lesson.type==='video'?<div style={{aspectRatio:'16/9',background:'#0f172a',borderRadius:12,color:'#fff',display:'grid',placeItems:'center'}}>Lesson video placeholder</div>:<p>{lesson.content}</p>}<button className='btn' style={{marginTop:12}}>Mark as complete</button>{next && <p style={{marginTop:8}}><Link href={`/learn/${course.id}/lesson/${next.id}`}>Next lesson: {next.title}</Link></p>}</article></main>
}
