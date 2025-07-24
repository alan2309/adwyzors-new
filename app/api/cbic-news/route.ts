// app/api/cbic-news/route.ts
import axios from "axios";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const url = "https://www.cbic.gov.in/htdocs-cbec/whats-new";
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const newsList: { title: string; link: string }[] = [];

    $("ul.list li a").each((_, el) => {
      const title = $(el).text().trim();
      const link = $(el).attr("href") || "";
      const fullLink = link.startsWith("http") ? link : `https://www.cbic.gov.in${link}`;
      newsList.push({ title, link: fullLink });
    });

    return NextResponse.json({ news: newsList });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch news-"+err }, { status: 500 });
  }
}
