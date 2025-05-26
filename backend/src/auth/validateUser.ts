import type { SignedInAuthObject } from "@clerk/backend/internal";
import { getAuth } from "@hono/clerk-auth";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export function validateUser(c: Context): SignedInAuthObject {
  const user = getAuth(c);
  if (!user?.userId) {
    throw new HTTPException(401, {
      message: "Unauthorized",
    });
  }

  return user;
}
