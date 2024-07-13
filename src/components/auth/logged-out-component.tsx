import LoginSignupButtons from "@/components/auth/loginSignup-buttons";

const LoggedOutComponent = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-full">
      <p className="text-6xl">Welcome To ChatNest</p>
      <p className="text-2xl">Login Or SignUp to Start Chatting</p>
      <LoginSignupButtons />
    </div>
  );
};

export default LoggedOutComponent;
