import { courses } from '@/lib/mock-data';
import { CourseCard } from '@/components/courses/CourseCard';
export default function CoursesPage(){ return <div className='grid' style={{gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))'}}>{courses.map(c => <CourseCard key={c.id} course={c}/>)}</div>; }
