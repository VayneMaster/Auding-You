// lib/duckduckgo.ts
export async function searchADHDAndAutism(query: string) {
  const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(
    query + " ADHD Autism"
  )}&format=json&no_html=1`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    return (data.RelatedTopics || []).map((t: any) => ({
      title: t.Text,
      link: t.FirstURL,
    }));
  } catch (err) {
    console.error("DuckDuckGo search failed:", err);
    return [];
  }
}
