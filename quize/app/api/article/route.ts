import prisma from "@/lib/prisma";

export const POST = async (req: Request) => {
  const { title, content, userId } = await req.json();

  // GEMINI <= content

  const res = await prisma.article.create({
    data: { title, content, summery: "test2", userId },
  });
  return new Response(JSON.stringify({ res }));
};
export const GET = async (request: Request) => {};
