import { auth } from "@/auth";
import React from "react";

export default async function sessionProvider({ children }: any) {

  return <>{children}</>;
}
