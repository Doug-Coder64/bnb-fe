import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "./session.server";
import { verifyLogin, findUserById } from "~/models/user.server";
import type { User } from "@prisma/client";

// Create an Authenticator instance
export let authenticator = new Authenticator<User>(sessionStorage);

// Configure the authenticator with the FormStrategy
authenticator.use(
  new FormStrategy(async ({ form }) => {
    let email = form.get("email") as string;
    let password = form.get("password") as string;

    // Verify the user's credentials using the verifyLogin function
    let user = await verifyLogin(email, password);

    if (!user) {
      throw new Error("Invalid username or password");
    }

    return user; // Return the user object after successful authentication
  }),
  "user-pass" // The name of the strategy, used when calling authenticate
);

// If you need to retrieve a user from the session, you can use the isAuthenticated method
export async function getUser(request: Request): Promise<User | null> {
  return await authenticator.isAuthenticated(request);
}
