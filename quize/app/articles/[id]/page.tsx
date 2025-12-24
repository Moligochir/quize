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
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  const showData = async (request: Request) => {
    try {
      const res = await fetch("api/article", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
    } catch (error) {
      console.error(error);
    }
  };
  showData();
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
              <CardTitle>Genghis khan</CardTitle>
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
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="w-full flex justify-end">
                      see more
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Genghis khan</DialogTitle>
                      <DialogDescription>
                        Born between 1155 and 1167 and given the name Temüjin,
                        he was the eldest child of Yesugei, a Mongol chieftain
                        of the Borjigin clan, and his wife Hö'elün. When Temüjin
                        was eight, his father died and his family was abandoned
                        by its tribe. Reduced to near-poverty, Temüjin killed
                        his older half-brother to secure his familial position.
                        His charismatic personality helped to attract his first
                        followers and to form alliances with two prominent
                        steppe leaders named Jamukha and Toghrul; they worked
                        together to retrieve Temüjin's newlywed wife Börte, who
                        had been kidnapped by raiders. As his reputation grew,
                        his relationship with Jamukha deteriorated into open
                        warfare. Temüjin was badly defeated in c. 1187, and may
                        have spent the following years as a subject of the Jin
                        dynasty; upon reemerging in 1196, he swiftly began
                        gaining power. Toghrul came to view Temüjin as a threat
                        and launched a surprise attack on him in 1203. Temüjin
                        regrouped and overpowered Toghrul; after defeating the
                        Naiman tribe and executing Jamukha, he was left as the
                        sole ruler on the Mongolian steppe.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex justify-start">
                <Button onClick={""} disabled={""} className="h-10">
                  Take a quiz
                </Button>
                {/* {error && <p className="text-red-500 mb-4">{error}</p>} */}
                {/* <p>{post}</p> */}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex w-full px-10 justify-end items-end  absolute bottom-10"></div>
    </div>
  );
}
