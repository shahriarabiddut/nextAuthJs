import { auth } from "@/actions/auth";
import LogoutButton from "@/components/auth/logout-button";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await auth();
  if (!session?.user) redirect("/");
  return (
    <main className="flex flex-col h-full justify-center items-center bg-gradient-to-r from-blue-800 via-sky-500  to-blue-800">
      <div className="space-y-6 flex flex-col  justify-center items-center">
        <h1 className={cn("text-6xl font-semibold text-white drop-shadow-md ")}>
          Welcome, Back
        </h1>
        <p className="text-white text-3xl">{session?.user?.name}</p>
        <LogoutButton />
        <div></div>
      </div>
    </main>
  );
};

export default Home;
