import { draftMode } from 'next/headers';
 
async function getContent() {
  const { isEnabled } = await draftMode();
 
  const contentUrl = isEnabled
    ? 'https://draft.example.com'
    : 'https://production.example.com';
 
  // This line enables ISR, required for draft mode
  const res = await fetch(contentUrl, { next: { revalidate: 120 } });
 
  return res.json();
}
 
export default async function Page() {
  const { title, desc } = await getContent();
 
  return (
    <main>
      <h1>{title}</h1>
      <p>{desc}</p>
    </main>
  );
}