import prisma from "@/lib/prisma";

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <article className="max-w-2xl space-y-4 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-4xl font-bold mb-8 text-[#333333]">
          My first post
        </h1>
        <p className="text-gray-600 text-center">by Anonymous</p>
        <div className="prose prose-gray mt-8">No content available.</div>
      </article>
    </div>
  );
}
