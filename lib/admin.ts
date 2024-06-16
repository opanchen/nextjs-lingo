import { auth } from "@clerk/nextjs/server";

const adminIds = [process.env.ADMIN_USER_ID];

export const isAdmin = () => {
  const { userId } = auth();

  if (!userId) return false;

  if (adminIds.length === 0 || !adminIds[0]) return false;

  return adminIds.indexOf(userId) !== -1;
};
