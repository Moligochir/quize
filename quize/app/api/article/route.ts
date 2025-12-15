import prisma from "@/lib/prisma";

export const POST = async (request: Request) => {
  await prisma.article.create({
    data: await request.json(),
  });
  return new Response(JSON.stringify({}), {});
};
export const GET = async (request: Request) => {};
