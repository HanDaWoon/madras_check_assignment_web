import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import Home from "@/components/main";
import { redirect } from "next/navigation";

const MainPage = async () => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  return (
    <SessionProvider session={session}>
      <Home />
    </SessionProvider>
  );
};

export default MainPage;
