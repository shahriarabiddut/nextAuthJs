import { doLogout } from "@/actions/login";
import { Button } from "@/components/ui/button";

const LogoutButton = () => {
  return (
    <form action={doLogout}>
      <Button type="submit" className="w-full">
        Logout
      </Button>
    </form>
  );
};

export default LogoutButton;
