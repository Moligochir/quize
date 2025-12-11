"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FileText, RotateCw, Sparkles, Trash, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SideBar } from "./_components/SideBar";

type DetectedObject = {
  label: string;
  score: number;
  box: { xmin: number; ymin: number; xmax: number; ymax: number };
};

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [objects, setObjects] = useState<DetectedObject[]>([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      setObjects([]);
    }
  };

  const handleDetect = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setObjects([]);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const data = await (
        await fetch("/api/object-derection", {
          method: "POST",
          body: formData,
        })
      ).json();

      setObjects(data.object || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeSelectedImage = () => {
    setSelectedFile(null);

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview("");
  };
  return (
    <div className="w-full  flex-col justify-end items-end ">
      <div className="flex w-full justify-between items-center pl-12 pr-12">
        <h1 className="p-4  text-xl font-bold">AI tools</h1>
        <Button variant="outline" size="icon" className="rounded-full w-10 ">
          <User2 />
        </Button>
      </div>
      <hr className="w-full" />

      <div className="flex w-full justify-center h-full items-start">
        {" "}
        <SideBar />
        <div className="flex w-full max-w-[580px] flex-col gap-6">
          <Card className="border-none shadow-none ">
            <CardHeader>
              <CardTitle>
                <div className="flex w-full h-fit justify-between">
                  <div className="flex gap-2 justify-center items-center text-lg font-bold">
                    <Sparkles />
                    Article Quiz Generator
                  </div>
                  {/* <Button
                    className="w-12 h-10"
                    variant="outline"
                    size="icon"
                    aria-label="Submit"
                  >
                    <RotateCw />
                  </Button> */}
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
                  onChange={handleImageUpload}
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
                  onChange={handleImageUpload}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={handleDetect}
                  disabled={!imagePreview}
                  className="h-10"
                >
                  {loading ? "Generating..." : "Generate"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex w-full px-10 justify-end items-end  absolute bottom-10"></div>
    </div>
  );
}
