"use client";

import React, { useState } from "react";

import { BookOpen, FileText, Sparkles } from "lucide-react";
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
              <CardDescription className="flex gap-2 text-xs justify-start items-center">
                <BookOpen />
                Summarized content
              </CardDescription>
              <h1 className="w-full h-fit">
                Born Temüjin, Genghis Khan overcame a difficult childhood marked
                by poverty and abandonment after his father's death, building
                his initial following through charisma and early alliances.
                After years of strategic maneuvering, betrayals, and decisive
                victories against former allies and rivals like Jamukha and
                Toghrul, he emerged as the sole ruler of the Mongolian steppe.
              </h1>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3"></div>
              <div className="grid gap-3">
                <CardDescription className="flex gap-2 text-xs justify-start items-center">
                  <FileText />
                  Article Content
                </CardDescription>
                <h1 className="h-12 w-full overflow-hidden">
                  Born between 1155 and 1167 and given the name Temüjin, he was
                  the eldest child of Yesugei, a Mongol chieftain of the
                  Borjigin clan, and his wife Hö'elün. When Temüjin was eight,
                  his father died and his family was abandoned by its tribe.
                  Reduced to near-poverty, Temüjin killed his older half-brother
                  to secure his familial position. His charismatic personality
                  helped to attract his first followers and to form alliances
                  with two prominent steppe leaders named Jamukha and Toghrul;
                  they worked together to retrieve Temüjin's newlywed wife
                  Börte, who had been kidnapped by raiders. As his reputation
                  grew, his relationship with Jamukha deteriorated into open
                  warfare. Temüjin was badly defeated in c. 1187, and may have
                  spent the following years as a subject of the Jin dynasty;
                  upon reemerging in 1196, he swiftly began gaining power.
                  Toghrul came to view Temüjin as a threat and launched a
                  surprise attack on him in 1203. Temüjin regrouped and
                  overpowered Toghrul; after defeating the Naiman tribe and
                  executing Jamukha, he was left as the sole ruler on the
                  Mongolian steppe.
                </h1>
                <button className="w-full flex justify-end">see more</button>
              </div>
              <div className="flex justify-start">
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="h-10"
                >
                  Take a quiz
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
