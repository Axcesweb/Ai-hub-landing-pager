import { Comment, Course, Creator, Video } from '@/types';
import { AdminUser, Analytics, CourseApproval, ModerationItem, ReportItem } from '@/types/admin';

export const creators: Creator[] = [
  { id:'cr1', name:'Nia Chen', avatar:'https://picsum.photos/64?1', subscribers:128000, bio:'AI builder and educator.' },
  { id:'cr2', name:'Ari Singh', avatar:'https://picsum.photos/64?2', subscribers:84200, bio:'Covers AI tools and workflows.' }
];

export const videos: Video[] = [
  { id:'v1', title:'Build an AI Tutor App', description:'Full walkthrough for a production-ready tutor.', url:'https://example.com/video/v1', thumbnail:'https://picsum.photos/800/450?11', creatorId:'cr1', tags:['rag','nextjs'], views:24012, likes:1802, createdAt:'2026-05-20' },
  { id:'v2', title:'Prompt Patterns that Scale', description:'Reusable prompt architectures.', url:'https://example.com/video/v2', thumbnail:'https://picsum.photos/800/450?12', creatorId:'cr2', tags:['prompting'], views:17831, likes:1320, createdAt:'2026-05-19' }
];

export const comments: Comment[] = [
  { id:'cm1', videoId:'v1', author:'@maya', text:'Great practical walkthrough.', likes:22 },
  { id:'cm2', videoId:'v1', author:'@dante', text:'How does this compare vs fine-tuning?', likes:8 },
  { id:'cm3', videoId:'v1', author:'@nia', text:'Replying: great question, I cover this at 12:30.', likes:5, parentId:'cm2' }
];

export const courses: Course[] = [
  { id:'co1', title:'AI Product Foundations', description:'Start from fundamentals to shipping.', instructor:'Nia Chen', difficulty:'Beginner', progress:60, badge:'Explorer', modules:[{ id:'m1', title:'Intro to AI products', lessons:[{ id:'l1', title:'What makes AI products different?', type:'text', content:'AI products are probabilistic systems...', duration:'8 min' },{ id:'l2', title:'Build your first agent', type:'video', content:'https://example.com/lesson/l2', duration:'18 min' }] }] },
  { id:'co2', title:'LLM App Architecture', description:'Design scalable AI application stacks.', instructor:'Ari Singh', difficulty:'Intermediate', progress:20, badge:'Architect', modules:[{ id:'m2', title:'System design', lessons:[{ id:'l3', title:'Choosing retrieval patterns', type:'video', content:'https://example.com/lesson/l3', duration:'14 min' }] }] }
];

export const adminUsers: AdminUser[] = [
  { id:'u1', name:'Sara Kim', email:'sara@aihub.network', role:'admin', status:'active' },
  { id:'u2', name:'Leo Tran', email:'leo@aihub.network', role:'moderator', status:'active' },
  { id:'u3', name:'Nora Jain', email:'nora@aihub.network', role:'editor', status:'suspended' }
];
export const moderationQueue: ModerationItem[] = [
  { id:'m1', type:'video', title:'Autonomous Agent Demo', reason:'Potential policy violation', status:'pending' },
  { id:'m2', type:'comment', title:'Comment on v1', reason:'Abusive language', status:'pending' }
];
export const courseApprovals: CourseApproval[] = [
  { id:'ca1', courseTitle:'Advanced Prompt Ops', instructor:'Ari Singh', submittedAt:'2026-05-24', status:'pending' },
  { id:'ca2', courseTitle:'AI Safety Fundamentals', instructor:'Nia Chen', submittedAt:'2026-05-22', status:'changes_requested' }
];
export const reportedContent: ReportItem[] = [
  { id:'r1', targetType:'video', targetRef:'v2', reportReason:'Misleading title', reportedAt:'2026-05-25', priority:'medium' },
  { id:'r2', targetType:'user', targetRef:'u9', reportReason:'Spam activity', reportedAt:'2026-05-25', priority:'high' }
];
export const analytics: Analytics = { dau: 8421, newUsers7d: 1290, pendingModeration: 14, completionRate: 67 };


export const news = [
  { id:'n1', headline:'Open-source multimodal assistants accelerate learning', source:'AI Hub Daily', publishedAt:'2026-05-25' },
  { id:'n2', headline:'New benchmarks focus on reliability over raw scores', source:'Model Weekly', publishedAt:'2026-05-24' }
];

export const posts = [
  { id:'p1', author:'@maya', content:'Shared my first course project demo today 🚀', likes:31 },
  { id:'p2', author:'@dante', content:'Anyone comparing RAG frameworks this month?', likes:17 }
];
