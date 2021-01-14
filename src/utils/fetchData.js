import React from "react";
import Announcement from "../components/Announcement";
import Product from "../components/Product";
import Event from "../components/Event";
import Tweet from "../components/Tweet";

const fetchData = async () => {
  const tabs = [
    { title: "Announcements", key: "anns", render: Announcement },
    { title: "Products", key: "pubs", render: Product },
    { title: "Events", key: "events", render: Event },
    { title: "Twitter", key: "twitter", render: Tweet },
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
