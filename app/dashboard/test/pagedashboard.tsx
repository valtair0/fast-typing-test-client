"use client";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import React from "react";

export default function Pagedashboard({ session }: any) {

  const builder: HubConnectionBuilder = new HubConnectionBuilder();

  const hubConnection: HubConnection = builder
    .withUrl("https://localhost:7157/typingexam-hub/", {
      accessTokenFactory: () => session.accessToken,
    })
    .withAutomaticReconnect()
    .build();

  hubConnection.start().then(() => {});

  hubConnection.on("reciveTypingExam", (message) => {
    console.log(message);
  });

  return (
    <div>
      <button
        className="mt-32 ml-20"
        onClick={() => {
          hubConnection
            .invoke("typingExamDuelRequest", "Hello")
            .then((message) => {
              console.log(message);
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        button
      </button>
    </div>
  );
}
