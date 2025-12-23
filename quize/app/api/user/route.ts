import { prisma } from "@/lib/prisma";

export async function handleUserCreated(event: any) {
  const user = event.data;
  const { title, content, userId } = await event.data.json();

  await prisma.user.create({
    data: {
      clerkId: user.id,
      email: user.email_addresses[0].email_address,
      name: user.name,
    },
  });
}
