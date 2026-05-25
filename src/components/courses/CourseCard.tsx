import Image from 'next/image';
import { Course } from '@/types';
export const CourseCard = ({ course }: { course: Course }) => (<article className='card'><Image src={course.cover} alt={course.title} width={480} height={280} style={{width:'100%',height:'auto',borderRadius:12}}/><h3>{course.title}</h3><p className='badge'>{course.level} • {course.lessons} lessons</p></article>);
