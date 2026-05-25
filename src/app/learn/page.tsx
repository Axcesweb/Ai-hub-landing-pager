import Link from 'next/link';
import { courses } from '@/lib/mock-data';

export default function LearnPage(){
  return <main className='container grid'><h1 className='h1'>Learning Paths</h1><div className='grid' style={{gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))'}}>{courses.map(c=><article key={c.id} className='card'><h3>{c.title}</h3><p>{c.description}</p><p className='muted'>{c.instructor} • {c.difficulty}</p><div className='progress'><span style={{width:`${c.progress}%`}}/></div><p className='muted'>Progress {c.progress}% • Badge: {c.badge}</p><Link href={`/learn/${c.id}`}>View course</Link></article>)}</div></main>
}
