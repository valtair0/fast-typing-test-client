"use client";
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from "@microsoft/signalr";
import React, { useEffect } from "react";

export default function Pagedashboard({ accessToken }: any) {
  const builder: HubConnectionBuilder = new HubConnectionBuilder();

  const hubConnection: HubConnection = builder
    .withUrl("http://localhost:5198/typingexam-hub/", {
      accessTokenFactory: () => accessToken,
      skipNegotiation: true,
      transport: 1,
    })
    .withAutomaticReconnect()
    .build();

  useEffect(() => {
    if (hubConnection.state === HubConnectionState.Disconnected) {
      hubConnection
        .start()
        .then(() => {
          console.log("Connection started");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [hubConnection]);

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
