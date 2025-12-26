// import prisma from "@/lib/prisma";

// export const POST = async (req: Request) => {
//   const { title, content, userId } = await req.json();

//   const res = await prisma.article.create({
//     data: { title, content, summery: "test2", userId },
//   });
//   return new Response(JSON.stringify({ res }));
// };

// import prisma from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export const GET = async (request: Request) => {
  try {
    const articles = await prisma.article.findMany();
    console.log(articles, "articles");

    return new Response(JSON.stringify({ articles }), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to fetch all articles", { status: 500 });
  }
};

// export const POST = async (request: Request) => {
//   const { clerkId } = await request.json();

//   const user = await prisma.user.findFirst({ where: { clerkId } });

//   try {
//     const { title, content, userId } = await request.json();

//     if (!title || !content || !userId) {
//       return new Response(
//         JSON.stringify({ error: "Title, content, and userId are required" }),
//         { status: 400 }
//       );
//     } else {
//     }
//     const res = await model.generateContent({
//       contents: [
//         {
//           role: "user",
//           parts: [
//             {
//               text: `Summarize briefly in 2-3 sentences:\nTitle: ${title}\nContent: ${content}`,
//             },
//           ],
//         },
//       ],
//     });

//     const response = res.response;
//     console.log(res, "response");

//     const summery = response.text() || "";

//     const article = await prisma.article.create({
//       data: { title, content, summery, userId },
//     });
//     console.log(summery, "summary");
//     return new Response(JSON.stringify({ article }), { status: 201 });
//   } catch (err) {
//     console.error(err);
//     return new Response(JSON.stringify({ error: "Failed to create article" }), {
//       status: 500,
//     });
//   }
// };
import prisma from "@/lib/prisma";

export const POST = async (request: Request) => {
  try {
    const { clerkId, title, content } = await request.json();
    console.log(clerkId, "clerkid", title, "title", content, "sddsadsadadsa");

    if (!clerkId || !title || !content) {
      return new Response(
        JSON.stringify({ error: "clerkId, title, content are required" }),
        { status: 400 }
      );
    }

    let user = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user)
      return new Response(JSON.stringify({ error: "Please login" }), {
        status: 400,
      });

    const res = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Summarize briefly in 2-3 sentences:\nTitle: ${title}\nContent: ${content}`,
            },
          ],
        },
      ],
    });

    const summary = res.response.text() || "";

    const article = await prisma.article.create({
      data: {
        title,
        content,
        summary,
        userId: user?.id,
      },
    });

    return new Response(JSON.stringify({ message: "Success", user, article }), {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      { status: 500 }
    );
  }
};
