import { BookOpen, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

export const SummarizeHistory = () => {
  const [title, setTitle] = useState<string[]>([]);
  const [summary, setSummary] = useState<string[]>([]);
  const [content, setContent] = useState<string[]>([]);

  const getDataArticle = async () => {
    try {
      const res = await fetch(`/api/article`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await res.json();
      console.log(jsonData, "json");

      setTitle(jsonData.articles[0].title);
      setSummary(jsonData.articles[0].summary);
      setContent(jsonData.articles[0].content);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(title, "title");

  useEffect(() => {
    getDataArticle();
  }, []);

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
              <CardTitle>{title}</CardTitle>
              <h1 className="w-full h-fit">{summary}</h1>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3"></div>
              <div className="grid gap-3">
                <CardDescription className="flex gap-2 text-xs justify-start items-center">
                  <FileText />
                  Article Content
                </CardDescription>
                <h1 className="h-12 w-full overflow-hidden">{content}</h1>
                <Dialog>
                  <DialogTrigger className="flex justify-end" asChild>
                    <button className="w-full  cursor-pointer hover:underline">
                      see more
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>{title}</DialogTitle>
                      <DialogDescription>{content}</DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex justify-start">
                <Button className="h-10">Take a quiz</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex w-full px-10 justify-end items-end  absolute bottom-10"></div>
    </div>
  );
};
