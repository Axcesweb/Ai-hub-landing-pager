import Link from 'next/link';
import Image from 'next/image';
import { courses, creators, videos } from '@/lib/mock-data';

export default function Home(){
  return <main className='container grid'>
    <section className='card'><h1 className='h1'>Learn AI. Build AI. Grow with AI.</h1><p>Discover creator videos, structured courses, and daily AI insights.</p><div style={{display:'flex',gap:8}}><button className='btn'>Start Learning</button><button className='btn subtle'>Explore Videos</button></div></section>
    <div className='layout'>
      <section className='grid'>{videos.map(v=><article key={v.id} className='card'><Image src={v.thumbnail} alt={v.title} width={800} height={450} style={{width:'100%',height:'auto',borderRadius:12}}/><h3>{v.title}</h3><p className='muted'>{creators.find(c=>c.id===v.creatorId)?.name} • {v.views.toLocaleString()} views</p><Link href={`/video/${v.id}`}>Open video</Link></article>)}</section>
      <aside className='grid'>
        <section className='card'><h3>Trending creators</h3>{creators.map(c=><p key={c.id} className='muted'>{c.name} • {c.subscribers.toLocaleString()} subs</p>)}</section>
        <section className='card'><h3>Recommended courses</h3>{courses.map(c=><p key={c.id} className='muted'>{c.title} • {c.difficulty}</p>)}</section>
      </aside>
    </div>
  </main>
}
