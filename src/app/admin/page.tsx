import { adminUsers, analytics, courseApprovals, moderationQueue, reportedContent } from '@/lib/mock-data';

function AnalyticsCard({ label, value }: { label: string; value: string | number }) {
  return <div className='card'><p className='muted'>{label}</p><h3 style={{margin:0}}>{value}</h3></div>;
}

function Table({ headers, rows }: { headers: string[]; rows: (string | number)[][] }) {
  return <div className='card' style={{overflowX:'auto'}}><table style={{width:'100%',borderCollapse:'collapse'}}><thead><tr>{headers.map(h => <th key={h} style={{textAlign:'left',padding:'8px 0'}}>{h}</th>)}</tr></thead><tbody>{rows.map((r,i)=><tr key={i}>{r.map((c,j)=><td key={j} style={{padding:'8px 0',borderTop:'1px solid #eef2f7'}}>{c}</td>)}</tr>)}</tbody></table></div>;
}

export default function AdminDashboard(){
  return <main className='container' style={{display:'grid',gridTemplateColumns:'220px 1fr',gap:16}}>
    <aside className='card' style={{height:'fit-content'}}>
      <h3>Admin</h3>
      <p className='muted'>Overview</p><p className='muted'>User Management</p><p className='muted'>Content Moderation</p><p className='muted'>Course Approvals</p><p className='muted'>Reports</p><p className='muted'>Analytics</p>
    </aside>
    <section className='grid'>
      <h1 className='h1'>Platform Administration</h1>
      <div className='grid' style={{gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))'}}>
        <AnalyticsCard label='Daily Active Users' value={analytics.dau.toLocaleString()} />
        <AnalyticsCard label='New Users (7d)' value={analytics.newUsers7d.toLocaleString()} />
        <AnalyticsCard label='Pending Moderation' value={analytics.pendingModeration} />
        <AnalyticsCard label='Course Completion Rate' value={`${analytics.completionRate}%`} />
      </div>
      <h3>User management</h3>
      <Table headers={['Name','Email','Role','Status']} rows={adminUsers.map(u=>[u.name,u.email,u.role,u.status])} />
      <h3>Content moderation</h3>
      <Table headers={['Type','Title','Reason','Status']} rows={moderationQueue.map(m=>[m.type,m.title,m.reason,m.status])} />
      <h3>Course approval system</h3>
      <Table headers={['Course','Instructor','Submitted','Status']} rows={courseApprovals.map(c=>[c.courseTitle,c.instructor,c.submittedAt,c.status])} />
      <h3>Reported content review</h3>
      <Table headers={['Type','Reference','Reason','Priority']} rows={reportedContent.map(r=>[r.targetType,r.targetRef,r.reportReason,r.priority])} />
    </section>
  </main>;
}
