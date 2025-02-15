import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google/callback`,
            {
              email: user.email,
              name: user.name,
              image: user.image,
              googleId: account.providerAccountId,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          return true;
        } catch (error) {
          console.error("Error saving user:", error);
          return true; // Still allow sign in even if backend fails
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  pages: {
    signIn: "/",
    // error: '/auth/error',
    // signOut: '/auth/signout'
  },
  session: {
    strategy: "jwt",
  },
};
