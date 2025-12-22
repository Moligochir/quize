"use client";

import React, { useState } from "react";

import { FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useUser } from "@clerk/nextjs";

type DetectedObject = {
  label: string;
  score: number;
  box: { xmin: number; ymin: number; xmax: number; ymax: number };
};

export default function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [post, setPost] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useUser();
  console.log(title, "title");
  console.log(content, "content");
  console.log(user, "useree");

  const userId = user?.id;

  // use => userId(clerkId)
  console.log(userId, "userId");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, userId }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate post");
      }

      const data = await res.json();
      setPost(data.post);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full  flex-col justify-end items-end ">
      <hr className="w-full" />
      <div className="flex w-full justify-center h-full items-start">
        <div className="flex w-full max-w-[580px] flex-col gap-6">
          <Card className="border-none shadow-none ">
            <CardHeader>
              <CardTitle>
                <div className="flex w-full h-fit justify-between">
                  <div className="flex gap-2 justify-center items-center text-lg font-bold">
                    <Sparkles />
                    Article Quiz Generator
                  </div>
                </div>
              </CardTitle>
              <CardDescription>
                Paste your article below to generate a summarize and quiz
                question. Your articles will saved in the sidebar for future
                reference.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <label className="flex">
                  <FileText />
                  Article Title
                </label>
                <Input
                  className="h-10"
                  id="tabs-demo-name"
                  placeholder="Enter a title for your article..."
                  accept="image/*" // Restrict file selection to images
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
                <label className="flex">
                  <FileText />
                  Article Title
                </label>
                <Input
                  className="h-10"
                  id="tabs-demo-name"
                  placeholder="Enter a title for your article..."
                  accept="image/*" // Restrict file selection to images
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="h-10"
                >
                  {isLoading ? "Generating..." : "Generate"}
                </Button>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <p>{post}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex w-full px-10 justify-end items-end  absolute bottom-10"></div>
    </div>
  );
}
