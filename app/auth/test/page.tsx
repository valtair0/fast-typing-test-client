import React from "react";
import Pagedashboard from "./pagedashboard";
import { headers } from "next/headers";

export default async function testsadas() {
  //get cookie
  const headersList = headers();
  const cookies = headersList.get("cookie");
  let accessToken = cookies
    ?.split(";")
    .find((cookie) => cookie.includes("accessToken"));
  accessToken = accessToken?.split("=")[1];

  return (
    <div>
      <Pagedashboard accessToken={accessToken}></Pagedashboard>
    </div>
  );
}
