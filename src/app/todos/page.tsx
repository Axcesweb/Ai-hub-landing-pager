import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

type TodoRow = {
  id: string | number;
  name: string;
};

export default async function TodosPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.from('todos').select('id, name');
  const todos = (data ?? []) as TodoRow[];

  return (
    <main className='container grid'>
      <section className='card'>
        <h1 className='h1'>Supabase Todos</h1>
        {error ? <p className='muted'>Could not load todos right now.</p> : null}
        <ul>
          {todos.map((todo) => <li key={todo.id}>{todo.name}</li>)}
        </ul>
      </section>
    </main>
  );
}
