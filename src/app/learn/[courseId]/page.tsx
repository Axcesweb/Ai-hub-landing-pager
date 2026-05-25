import Link from 'next/link';
import { courses } from '@/lib/mock-data';

export default function CourseDetail({ params }:{ params:{courseId:string}}){
  const c = courses.find(x=>x.id===params.courseId) || courses[0];
  return <main className='container grid'><article className='card'><h1>{c.title}</h1><p>{c.description}</p><p className='muted'>Instructor: {c.instructor} • {c.difficulty}</p></article>{c.modules.map(m=><section key={m.id} className='card'><h3>{m.title}</h3>{m.lessons.map(l=><p key={l.id}><Link href={`/learn/${c.id}/lesson/${l.id}`}>{l.title}</Link> <span className='muted'>({l.duration})</span></p>)}</section>)}</main>
}
