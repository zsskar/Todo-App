import { prisma } from "@/db/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import NextAuth, { getServerSession } from "next-auth/next";
import { GetServerSidePropsContext } from "next";
import { DefaultSession, NextAuthOptions } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
    accessToken?: string;
    idToken?: string;
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',  // Use JWT for session management
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ token, account }) {    
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.sub as string;
        session.accessToken = token.accessToken as string;
        session.idToken = token.idToken as string;
      }
      return session;
    },
  },
  pages:{
    signIn: "/login"
  }
};
  
  /**
   * Wrapper for `getServerSession` so that you don't need to import the
   * `authOptions` in every file.
   *
   * @see https://next-auth.js.org/configuration/nextjs
   **/
  export const getServerAuthSession = (ctx: {
    req: GetServerSidePropsContext["req"];
    res: GetServerSidePropsContext["res"];
  }) => {
    return getServerSession(ctx.req, ctx.res, authOptions);
  };



  export default NextAuth(authOptions);
