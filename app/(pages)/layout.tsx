import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { LoginButton } from "@/components/auth/login-button";
import { auth } from "@/actions/auth";
import { redirect } from "next/navigation";
import { LoaderPinwheelIcon } from "lucide-react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

export default async function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check User
  const session = await auth();
  console.log(session);
  //   if (!session?.user) <>Loading......</>;
  if (!session?.user) redirect("/");
  // Check User Ends
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
        <div>{children}</div>
      </div>
    </main>
  );
}
