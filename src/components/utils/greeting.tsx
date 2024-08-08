"use client";

const Greeting = ({ name }: { name: string }) => {
  return (
    <div className="text-center my-auto">
      <p className="text-6xl pb-6 text-primary">{name}</p>
      <p>
        Welcome to Chatnest. <br />
        Select a chat to start chatting!
      </p>
    </div>
  );
};

export default Greeting;
