import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/session";

// Поточний користувач (без passwordHash). Кешується в межах одного запиту.
export const getCurrentUser = cache(async () => {
  const userId = await getSessionUserId();
  if (!userId) return null;

  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      address: true,
      role: true,
      createdAt: true,
    },
  });
});
