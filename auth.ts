import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserService } from "./app/Services/models/UserService";

const credentialsProvider = CredentialsProvider({
  name: "Credentials",

  credentials: {
    email: { label: "Email", type: "text" },
    password: { label: "Password", type: "password" },
  },
  authorize: async (credentials) => {
    try {
      const response = await UserService.LoginUser({
        usernameOrEmail: credentials.email as string,
        password: credentials.password as string,
      });

      return {
        name: credentials.email as string,
        accessToken: response.accessToken,
        accessTokenExpiration: response.accessTokenExpiration,
        refreshToken: response.refreshToken,
      };
    } catch (error) {}

    return null;
  },
});

const config: NextAuthConfig = {
  providers: [Google, credentialsProvider],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.accessToken = user.accessToken;
        token.accessTokenExpiration = user.accessTokenExpiration;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken;
      session.accessTokenExpiration = token.accessTokenExpiration;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
