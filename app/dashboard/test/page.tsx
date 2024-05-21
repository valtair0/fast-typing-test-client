import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import React from "react";
import Pagedashboard from "./pagedashboard";

export default async function testsadas() {
  const session = await auth();

  return (
    <div>
      <Pagedashboard session={session}></Pagedashboard>
    </div>
  );
}
