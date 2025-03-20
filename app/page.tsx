import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { LoginButton } from "@/components/auth/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Home() {
  return (
    <main className="flex flex-col h-full justify-center items-center bg-gradient-to-r from-blue-800 via-sky-500  to-blue-800">
      <div className="space-y-6 flex flex-col  justify-center items-center">
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md ",
            font.className
          )}
        >
          Auth
        </h1>
        <p className="text-white text-lg ">A simple Authentication service!</p>
        <div>
          <LoginButton mode={"redirect"}>
            <Button variant={"secondary"} size={"lg"}>
              Sign In{" "}
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
