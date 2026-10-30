"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { type Post } from "@/content/posts";
import { ArticleCard } from "./page-parts";

export function BlogIndex({ posts }: { posts: Post[] }) {
  const [category, setCategory] = useState("All stories");
  const [query, setQuery] = useState("");
  const categories = [
    "All stories",
    ...new Set(posts.map((post) => post.category)),
  ];
  const shown = posts.filter(
    (post) =>
      (category === "All stories" || post.category === category) &&
      `${post.title} ${post.excerpt} ${post.category}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <section
      className="shell page-section blog-library"
      aria-label="Browse articles"
    >
      <div className="blog-toolbar">
        <div className="category-buttons" aria-label="Filter by topic">
          {categories.map((item) => (
            <button
              key={item}
              aria-pressed={item === category}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <label className="blog-search">
          <Search size={18} />
          <span className="sr-only">Search articles</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search the journal"
          />
        </label>
      </div>
      <p className="result-count" role="status">
        {shown.length} {shown.length === 1 ? "story" : "stories"}
      </p>
      <div className="article-grid">
        {shown.map((post) => (
          <ArticleCard post={post} key={post.slug} />
        ))}
      </div>
      {shown.length === 0 && (
        <div className="empty-results">
          <h2>No stories found.</h2>
          <p>Try another word or explore all our topics.</p>
          <button
            className="button button-outline"
            onClick={() => {
              setCategory("All stories");
              setQuery("");
            }}
          >
            Reset filters
          </button>
        </div>
      )}
    </section>
  );
}
