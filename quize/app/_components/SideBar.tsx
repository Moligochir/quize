"use client";

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { title } from "process";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

type Article = {
  title: string;
};

export function AppSidebar() {
  const [articles, setArticles] = useState<Article[]>([]);

  const getData = async () => {
    try {
      const res = await fetch("api/article", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await res.json();
      setArticles(jsonData.articles);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(articles, "resseeee");

  useEffect(() => {
    getData();
  }, []);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>History</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {articles.map((article, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <a href={""}>
                      <span>{article.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
