import React from "react";
import Announcement from "../components/Announcement";
import Product from "../components/Product";
import Event from "../components/Event";
import Tweet from "../components/Tweet";

const fetchData = async () => {
  const tabs = [
    {
      title: "Announcements",
      key: "anns",
      link: "http://feeds.feedburner.com/DVRPCAnnouncements",
      render: Announcement,
    },
    {
      title: "Products",
      key: "pubs",
      link: "https://www.dvrpc.org/Products/Search/",
      render: Product,
    },
    {
      title: "Events",
      key: "events",
      link: "https://www.dvrpc.org/Calendar/",
      render: Event,
    },
    {
      title: "Twitter",
      key: "twitter",
      link: "https://www.twitter.com/dvrpc",
      render: Tweet,
    },
  ];
  const responses = await Promise.all(
    [
      fetch("https://www2.dvrpc.org/asp/homepage/"),
      fetch("https://www2.dvrpc.org/asp/homepage/twitter.aspx?all=true"),
    ].map((p) => p.catch((e) => e))
  );
  const data = await responses[0].json();
  data.twitter = await responses[1].json();
  tabs.alert = data.alert;
  tabs.forEach((tab) => (tab.components = data[tab.key].map(tab.render)));
  return Promise.resolve(tabs);
};

export default fetchData;
