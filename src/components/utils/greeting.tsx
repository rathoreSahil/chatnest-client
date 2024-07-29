"use client";

import { GreetingProps } from "@/types";

const Greeting = ({ name }: GreetingProps) => {
  return (
    <div className="text-center my-auto">
      <p className="text-6xl pb-6 text-green-400">{name}</p>
      <p>
        Welcome to Chatnest. <br />
        Select a chat to start chatting!
      </p>
    </div>
  );
};

export default Greeting;
