"use client";

import React, { useState } from "react";

import { UserLogIn } from "./_components/UserLogIn";

// type DetectedObject = {
//   label: string;
//   score: number;
//   box: { xmin: number; ymin: number; xmax: number; ymax: number };
// };

export default function Home() {
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const [imagePreview, setImagePreview] = useState<string | null>(null);
  // const [objects, setObjects] = useState<DetectedObject[]>([]);
  // const [loading, setLoading] = useState(false);

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setSelectedFile(file);
  //     setImagePreview(URL.createObjectURL(file));
  //     setObjects([]);
  //   }
  // };

  // const handleDetect = async () => {
  //   if (!selectedFile) return;
  //   setLoading(true);
  //   setObjects([]);

  //   try {
  //     const formData = new FormData();
  //     formData.append("image", selectedFile);

  //     const data = await (
  //       await fetch("/api/object-derection", {
  //         method: "POST",
  //         body: formData,
  //       })
  //     ).json();

  //     setObjects(data.object || []);
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const removeSelectedImage = () => {
  //   setSelectedFile(null);

  //   if (imagePreview) {
  //     URL.revokeObjectURL(imagePreview);
  //   }
  //   setImagePreview("");
  // };
  return (
    <div className="flex justify-center w-full h-fit items-center">
      <UserLogIn />
    </div>
  );
}
