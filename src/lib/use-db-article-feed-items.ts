"use client";

import { useEffect, useState } from "react";
import { ARTICLES_EVENT, fetchDbArticles } from "@/lib/db-articles-client";
import { dbArticleAsFeedItem, type FeedItem } from "@/lib/feed";

export function useDbArticleFeedItems(): FeedItem[] {
  const [items, setItems] = useState<FeedItem[]>([]);

  useEffect(() => {
    let active = true;
    const load = () => {
      fetchDbArticles()
        .then((articles) => {
          if (active) setItems(articles.map(dbArticleAsFeedItem));
        })
        .catch(() => {
          if (active) setItems([]);
        });
    };

    load();
    window.addEventListener(ARTICLES_EVENT, load);
    return () => {
      active = false;
      window.removeEventListener(ARTICLES_EVENT, load);
    };
  }, []);

  return items;
}
