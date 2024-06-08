import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

// TODO: publicRoutes: ["/", "/api/webhooks/stripe"]

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
