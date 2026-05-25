import { comments, creators, videos } from '@/lib/mock-data';

export default function VideoPage({ params }: { params:{id:string} }){
  const video = videos.find(v=>v.id===params.id) || videos[0];
  const creator = creators.find(c=>c.id===video.creatorId)!;
  const rootComments = comments.filter(c=>c.videoId===video.id && !c.parentId);
  return <main className='container layout'>
    <section className='grid'>
      <article className='card'>
        <div style={{aspectRatio:'16/9',background:'#0f172a',borderRadius:12,display:'grid',placeItems:'center',color:'#fff'}}>Video Player Placeholder</div>
        <h1>{video.title}</h1><p>{video.description}</p>
        <p className='muted'>{video.views.toLocaleString()} views • {video.likes.toLocaleString()} likes</p>
      </article>
      <article className='card'><h3>{creator.name}</h3><p className='muted'>{creator.bio}</p><button className='btn'>Subscribe</button></article>
      <article className='card'><h3>Comments</h3>{rootComments.map(c=><div key={c.id} style={{marginBottom:12}}><p><strong>{c.author}</strong> {c.text}</p><p className='muted'>{c.likes} likes • Reply</p>{comments.filter(r=>r.parentId===c.id).map(r=><p key={r.id} className='muted' style={{paddingLeft:16}}>↳ <strong>{r.author}</strong> {r.text}</p>)}</div>)}</article>
    </section>
    <aside className='card'><h3>Suggested videos</h3>{videos.filter(v=>v.id!==video.id).map(v=><p key={v.id} className='muted'>{v.title}</p>)}<h4>Recommendation engine</h4><p className='muted'>Placeholder: rank by tags, watch history, and creator affinity.</p></aside>
  </main>
}
