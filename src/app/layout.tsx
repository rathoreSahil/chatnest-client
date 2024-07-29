import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "@/context/auth-provider";
import { SocketContextProvider } from "@/context/socket-provider";

import "@/app/globals.css";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "ChatNest",
  description: "Chat App using NextJS, MongoDB, Express, and Socket.io",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <SocketContextProvider>
            {children}
            <Toaster />
          </SocketContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
