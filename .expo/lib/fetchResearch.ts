import { XMLParser } from "fast-xml-parser";

export interface Article {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
}

// Trusted ADHD / Autism RSS feeds
const FEEDS = [
  "https://www.additudemag.com/feed/",
  "https://chadd.org/feed/", // Example Atom feed
];

export async function fetchResearchArticles(): Promise<Article[]> {
  const articles: Article[] = [];

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
  });

  for (const feedUrl of FEEDS) {
    try {
      const res = await fetch(feedUrl);
      const xml = await res.text();
      const data = parser.parse(xml);


let items: any[] = [];

if (data?.rss?.channel?.item) {
  // RSS
  items = Array.isArray(data.rss.channel.item)
    ? data.rss.channel.item
    : [data.rss.channel.item];
} else if (data?.feed?.entry) {
  // Atom
  items = Array.isArray(data.feed.entry)
    ? data.feed.entry
    : [data.feed.entry];
}

for (const item of items) {
  articles.push({
    title: item.title ?? "",
    link:
      item.link?.href ||
      item.link ||
      (item.enclosure && item.enclosure.url) ||
      "",
    pubDate:
      item.pubDate ||
      item.updated ||
      item.published ||
      new Date().toISOString(),
    contentSnippet:
      item.description ||
      item.summary ||
      item.content ||
      "",
  });
}


      items.forEach((item: any) => {
        articles.push({
          title: item.title,
          link: item.link?.href || item.link, // Atom uses <link href="...">
          pubDate: item.pubDate || item.updated || new Date().toISOString(),
          contentSnippet: item.description || item.summary || "",
        });
      });
    } catch (err) {
      console.error(`Failed to fetch feed ${feedUrl}:`, err);
    }
  }

  // Sort newest first
  articles.sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );

  return articles;
}
