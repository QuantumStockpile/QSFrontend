import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";

export function Login() {
  return (
    <div className="flex items-center justify-center place-self-center h-full w-80  mt-20">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
        <div className="flex flex-col items-center pb-6">
          <p className="text-xl font-medium">Влезте в акаунта си</p>
        </div>
        <div className="flex flex-col gap-4">
          <Input placeholder="Въведете имейла си" type="email" />
          <Input placeholder="Въведете паролата си" type="password" />
          <div className="flex w-full items-center justify-between px-1 py-2">
            <div className="flex items-center space-x-2">
              <Checkbox name="remember" />
              <Label htmlFor="terms">Запомни ме</Label>
            </div>
            <Button variant="link">Забравихте паролата?</Button>
          </div>
          <Button variant="default">
            Влез
            <Link to={"/a-eq"} />
          </Button>
        </div>
        <div className="flex items-center gap-4 py-2">
          <Separator className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">ИЛИ</p>
          <Separator className="flex-1" />
        </div>
        <div className="flex flex-col gap-2">
          <Button variant="outline">Продължи с Google</Button>
        </div>
        <p className="text-center text-small">
          Трябва да създадете акаунт?&nbsp;
          <Button variant="link" size="sm">
            Продължи
            <Link to={"/sign-up"} />
          </Button>
        </p>
      </div>
    </div>
  );
}
