const BING_API_KEY = process.env.EXPO_PUBLIC_BING_KEY; // store in env
const BING_ENDPOINT = "https://api.bing.microsoft.com/v7.0/search";

export async function searchADHDAndAutism(query: string) {
  const url = `${BING_ENDPOINT}?q=${encodeURIComponent(query + " ADHD Autism")}&count=10`;

  try {
    const res = await fetch(url, {
      headers: { "Ocp-Apim-Subscription-Key": BING_API_KEY! },
    });

    if (!res.ok) throw new Error(`Bing API error: ${res.status}`);
    const data = await res.json();

    return (data.webPages?.value || []).map((r: any) => ({
      title: r.name,
      link: r.url,
      snippet: r.snippet || "",
    }));
  } catch (err) {
    console.error("Bing search failed:", err);
    return [];
  }
}
