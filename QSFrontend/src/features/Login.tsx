import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { authService } from "@/services/authService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await authService.login({ username: email, password });
      // Redirect to dashboard or main page
      navigate("/u-dash");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpRedirect = () => {
    navigate("/sign-up");
  };

  return (
    <div className="flex items-center justify-center place-self-center h-full w-80 mt-20">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
        <div className="flex flex-col items-center pb-6">
          <p className="text-xl font-medium">Влезте в акаунта си</p>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <Input
            placeholder="Въведете имейла си"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            placeholder="Въведете паролата си"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex w-full items-center justify-between px-1 py-2">
            <div className="flex items-center space-x-2">
              <Checkbox name="remember" />
              <Label htmlFor="terms">Запомни ме</Label>
            </div>
            <Button variant="link" type="button">
              Забравихте паролата?
            </Button>
          </div>
          {/* Remove the potentially incorrect Button with Link if it's not needed */}
          {/* <Button variant="default">
            Влез
            <Link to={"/a-eq"} />
          </Button> */}

          {/* Error message inside the form */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* This is likely the correct submit button for the form */}
          <Button variant="default" type="submit" disabled={loading}>
            {loading ? "Влизане..." : "Влез"}
          </Button>
        </form>
        {/* These elements are siblings to the <form> and are correctly wrapped by the parent div */}
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
          <Button variant="link" size="sm" onClick={handleSignUpRedirect}>
            Продължи
            <Link to={"/sign-up"} />
          </Button>
        </p>
      </div>
    </div>
  );
}
