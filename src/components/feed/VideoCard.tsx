import Image from 'next/image';
import { Video } from '@/types';
export function VideoCard({ video }: { video: Video }) {
  return <article className='card'><Image src={video.thumbnail} alt={video.title} width={640} height={360} style={{width:'100%',height:'auto',borderRadius:12}}/><h3>{video.title}</h3><p className='badge'>{video.creator} • {video.views.toLocaleString()} views • {video.duration}</p></article>;
}
