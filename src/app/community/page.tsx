import { posts } from '@/lib/mock-data';
import { PostCard } from '@/components/community/PostCard';
export default function CommunityPage(){ return <div className='grid'>{posts.map(p=><PostCard key={p.id} post={p}/> )}</div>; }
