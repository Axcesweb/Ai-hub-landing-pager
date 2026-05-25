export type Creator = { id:string; name:string; avatar:string; subscribers:number; bio:string };
export type Video = { id:string; title:string; description:string; url:string; thumbnail:string; creatorId:string; tags:string[]; views:number; likes:number; createdAt:string };
export type Comment = { id:string; videoId:string; author:string; text:string; likes:number; parentId?:string };
export type Lesson = { id:string; title:string; type:'video'|'text'; content:string; duration:string };
export type Module = { id:string; title:string; lessons:Lesson[] };
export type Course = { id:string; title:string; description:string; instructor:string; difficulty:'Beginner'|'Intermediate'|'Advanced'; modules:Module[]; progress:number; badge:string };

export type NewsItem = { id:string; headline:string; source:string; publishedAt:string };
export type Post = { id:string; author:string; content:string; likes:number };
