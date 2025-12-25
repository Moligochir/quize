"use client";

import React, { useEffect, useState } from "react";

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
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { NextRequest } from "next/server";

export default function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [post, setPost] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useUser();

  console.log(title, "title");
  console.log(content, "content");

  const userId = user?.id;

  // use => userId(clerkId)
  console.log(userId, "userId");

  // const showData = async (request: NextRequest) => {
  //   try {
  //     const res = await fetch("api/article", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({}),
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   console.log();
  // };
  // showData();
  const createUser = async () => {
    try {
      await fetch("api/user", {
        method: "POST",
        body: JSON.stringify({
          name: user?.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
          clerkId: user?.id,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (user) createUser();
  }, [user]);

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
                <Textarea
                  className="h-40"
                  onChange={(e) => setContent(e.target.value)}
                ></Textarea>
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
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Share</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input
                id="link"
                defaultValue="https://ui.shadcn.com/docs/installation"
                readOnly
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
