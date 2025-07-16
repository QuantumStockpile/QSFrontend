import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function SignUp() {
  return (
    <div className="flex items-center justify-center place-self-center h-full w-80  mt-20">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
        <div className="flex flex-col items-center pb-6">
          <p className="text-lg text-default-500">За начало създайте акаунт</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col mb-6">
            <Input placeholder="Въведете потребителското си име" type="text" />
            <Input
              placeholder="Въведете имейла си"
              type="email"
              className="mt-4"
            />
            <Input
              placeholder="Въведете паролата си"
              type="password"
              className="mt-4"
            />
            <Input
              placeholder="Подтвърдете паролата си"
              type="password"
              className="mt-4"
            />
          </div>
          <Button variant="default">Регистрирай се</Button>
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
          Вече имате акаунт?&nbsp;
          <Button variant="link" size="sm">
            Продължи
          </Button>
        </p>
      </div>
    </div>
  );
}
