import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import LoginForm from "@/components/forms/login";

export default function Login() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-500 text-center">Fetch Dogs</CardTitle>
          <CardDescription>login details</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </>
  );
}
