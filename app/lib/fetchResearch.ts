import { XMLParser } from "fast-xml-parser";

export interface Article {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
}

interface RSSItem {
  title: string;
  link: string;
  pubDate: string;
  description?: string;
}

interface RSSChannel {
  item: RSSItem[] | RSSItem;
}

interface RSS {
  rss: {
    channel: RSSChannel;
  };
}

// Trusted ADHD / Autism RSS feeds
const FEEDS = [
  "https://www.additudemag.com/feed/",
  "https://www.autism.org.uk/rss/news.xml",
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

      const json: RSS = parser.parse(xml);

      let items = json.rss.channel.item;
      if (!Array.isArray(items)) items = [items];

      items.forEach((item) => {
        articles.push({
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          contentSnippet: item.description || "",
        });
      });
    } catch (err) {
      console.error(`Failed to fetch feed ${feedUrl}:`, err);
    }
  }

  articles.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  return articles;
}
