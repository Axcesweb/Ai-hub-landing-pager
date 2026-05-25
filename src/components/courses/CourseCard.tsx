import { Course } from '@/types';

export const CourseCard = ({ course }: { course: Course }) => {
  const lessonsCount = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);

  return (
    <article className='card'>
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <p className='muted'>{course.instructor} • {course.difficulty}</p>
      <p className='muted'>{lessonsCount} lessons • Badge: {course.badge}</p>
      <div className='progress' style={{ marginTop: 8 }}>
        <span style={{ width: `${course.progress}%` }} />
      </div>
    </article>
  );
};
