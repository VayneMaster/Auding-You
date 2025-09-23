const SERP_API_KEY = process.env.EXPO_PUBLIC_SERPAPI_KEY; //saved in .env file
const SERP_ENDPOINT = "https://serpapi.com/search.json";

//use api key to fetch search results
export async function searchADHDAndAutism(query: string) {
  const url = `${SERP_ENDPOINT}?engine=google&q=${encodeURIComponent(
    query + " ADHD Autism"
  )}&api_key=${SERP_API_KEY}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`SerpAPI error: ${res.status}`);

    const data = await res.json();

    return (data.organic_results || []).map((r: any) => ({
      title: r.title,
      link: r.link,
      snippet: r.snippet || "",
    }));
  } catch (err) { //log
    console.error("SerpAPI search failed:", err);
    return [];
  }
}
