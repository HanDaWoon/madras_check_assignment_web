import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { mFetch } from "@/util/mFetch";
import { cookies } from "next/headers";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        // logic to verify if user exists
        // await mFetch("/user", {
        //   credentials: "include",
        //   headers: {
        //     Authorization: `Basic ${Buffer.from(
        //       `${credentials.email}:${credentials.password}`,
        //     ).toString("base64")}`,
        //   },
        // })
        //   .then((response) => {
        //     if (response.ok) {
        //       return response.json();
        //     }
        //   })
        //   .then((data) => {
        //     user = data.data;
        //   });
        const req = await mFetch("/user", {
          credentials: "include",
          headers: {
            Authorization: `Basic ${Buffer.from(
              `${credentials.email}:${credentials.password}`,
            ).toString("base64")}`,
          },
        });
        if (req.ok) {
          const data = await req.json();
          user = data.data;
        }
        const session = req.headers
          .getSetCookie()
          .at(0)
          .split(";")
          .at(0)
          .split("=");

        if (!user) {
          // meaning this is also the place you could do registration
          throw new Error("User not found.");
        }

        cookies().set(session.at(0), session.at(1));

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
