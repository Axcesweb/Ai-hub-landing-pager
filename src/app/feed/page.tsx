import { videos, news, posts } from '@/lib/mock-data';
import { VideoCard } from '@/components/feed/VideoCard';
import { NewsList } from '@/components/news/NewsList';
import { PostCard } from '@/components/community/PostCard';
import { AIAssistantPlaceholder } from '@/components/assistant/AIAssistantPlaceholder';

export default function FeedPage(){
  return <div className='home-layout'>
    <section className='grid'>{videos.map(v => <VideoCard key={v.id} video={v} />)}</section>
    <section className='grid'>{posts.map(p => <PostCard key={p.id} post={p} />)}</section>
    <section className='grid'><NewsList items={news} /><AIAssistantPlaceholder /></section>
  </div>;
}
