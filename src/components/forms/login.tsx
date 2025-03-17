import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
});

type FormSchema = z.infer<typeof schema>;

const formFields: {
  name: keyof FormSchema;
  label: string;
  placeholder?: string;
  type: string;
  description?: string;
}[] = [
  {
    name: "name",
    label: "name",
    type: "text",
  },
  {
    name: "email",
    label: "email",
    placeholder: "agreat@example.com",
    type: "text",
  },
];

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "real@gmail.com",
      name: "",
    },
  });
  const { login } = useAuth();

  const onSubmit = async (data: FormSchema) => {
    try {
      await login(data.name, data.email);
      navigate("/search");
    } catch (err: unknown) {
      console.log(err);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {formFields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Input
                    type={field.type}
                    placeholder={field.placeholder}
                    {...formField}
                  />
                </FormControl>
                {field.description && (
                  <FormDescription>{field.description}</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit">submit</Button>
      </form>
    </Form>
  );
}
