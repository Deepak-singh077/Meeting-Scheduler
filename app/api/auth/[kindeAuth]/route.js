import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";

export const GET = handleAuth();
export const POST = handleAuth(); // If you also want to handle POST requests for login
