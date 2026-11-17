import type { Metadata } from "next";
import { CardNews, SectionHead } from "@/components/Cards";
import { home, news } from "@/lib/site";

export const metadata: Metadata = { title: "News ed eventi", description: home.news.text };

export default function Blog() {
  return (
    <section className="section section--sabbia section--top">
      <div className="wrap">
        <SectionHead as="h1" title={home.news.title} text={home.news.text} />
        <div className="grid-news">
          {news.map((n, i) => (
            <CardNews key={n.url} n={n} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
