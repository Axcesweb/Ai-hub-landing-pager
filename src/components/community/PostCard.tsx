import { Post } from '@/types';
export const PostCard = ({ post }: { post: Post }) => <article className='card'><strong>{post.author}</strong><p>{post.content}</p><span className='badge'>{post.likes} likes</span></article>;
