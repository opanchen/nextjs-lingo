import { auth } from "@clerk/nextjs/server";

const adminIds = ["user_2hN9Ky1jxdBABNfPl4mqUACjFcH"];

export const isAdmin = () => {
  const { userId } = auth();

  if (!userId) return false;

  return adminIds.indexOf(userId) !== -1;
};
