'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { createUser } from './action';
import { useFormStatus } from 'react-dom';

const Schema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export type Schema = z.infer<typeof Schema>;

export default function Page() {
  const form = useForm({
    schema: Schema,
  });
  const { pending } = useFormStatus();

  const onSubmit = (data: Schema) => createUser(data);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="contact@devinda.me" {...field} />
                </FormControl>
                <FormDescription>
                  This is the email you will use to login
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Super secure password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {pending ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
