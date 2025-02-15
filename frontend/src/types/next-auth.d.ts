import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      email: string;
      name: string;
      image?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}
