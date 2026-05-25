create table creators (
  id text primary key,
  name text not null,
  avatar text,
  bio text,
  subscribers int default 0
);
create table videos (
  id text primary key,
  title text not null,
  description text,
  url text not null,
  thumbnail text,
  creator_id text references creators(id),
  tags text[] default '{}',
  views int default 0,
  likes int default 0,
  created_at timestamptz default now()
);
create table comments (
  id text primary key,
  video_id text references videos(id),
  author text not null,
  text text not null,
  likes int default 0,
  parent_id text references comments(id)
);
create table courses (
  id text primary key,
  title text not null,
  description text,
  instructor text not null,
  difficulty_level text not null
);
create table course_modules (
  id text primary key,
  course_id text references courses(id),
  title text not null,
  position int not null
);
create table lessons (
  id text primary key,
  module_id text references course_modules(id),
  title text not null,
  content_type text not null,
  content text not null,
  duration text
);
create table user_course_progress (
  user_id text not null,
  course_id text references courses(id),
  lesson_id text references lessons(id),
  completed boolean default false,
  completion_badge text,
  primary key (user_id, lesson_id)
);
