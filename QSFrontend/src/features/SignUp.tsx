import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { authService } from "@/services/authService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Паролите не съвпадат");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Паролата трябва да бъде поне 8 символа");
      setLoading(false);
      return;
    }

    try {
      await authService.signUp({ username, email, password });
      // Redirect to login page with success message
      navigate("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center place-self-center h-full w-80  mt-20">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
        <div className="flex flex-col items-center pb-6">
          <p className="text-lg text-default-500">За начало създайте акаунт</p>
        </div>
        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          <div className="flex flex-col mb-6">
            <Input 
              placeholder="Въведете потребителското си име" 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              placeholder="Въведете имейла си"
              type="email"
              className="mt-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              placeholder="Въведете паролата си"
              type="password"
              className="mt-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              placeholder="Подтвърдете паролата си"
              type="password"
              className="mt-4"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <Button variant="default" type="submit" disabled={loading}>
            {loading ? "Регистриране..." : "Регистрирай се"}
          </Button>
        </form>
        <div className="flex items-center gap-4 py-2">
          <Separator className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">ИЛИ</p>
          <Separator className="flex-1" />
        </div>
        <div className="flex flex-col gap-2">
          <Button variant="outline">Продължи с Google</Button>
        </div>
        <p className="text-center text-small">
          Вече имате акаунт?&nbsp;
          <Button variant="link" size="sm" onClick={handleLoginRedirect}>
            Продължи
          </Button>
        </p>
      </div>
    </div>
  );
}
