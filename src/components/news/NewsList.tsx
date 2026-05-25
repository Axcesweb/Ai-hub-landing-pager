import { NewsItem } from '@/types';
export const NewsList = ({ items }: { items: NewsItem[] }) => <div className='card'>{items.map(n => <p key={n.id}><strong>{n.headline}</strong><br/><span className='badge'>{n.source} · {n.publishedAt}</span></p>)}</div>;
