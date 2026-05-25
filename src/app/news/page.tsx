import { news } from '@/lib/mock-data';
import { NewsList } from '@/components/news/NewsList';
export default function NewsPage(){ return <NewsList items={news} />; }
