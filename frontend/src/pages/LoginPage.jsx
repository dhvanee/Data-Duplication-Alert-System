
import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { FileCard, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card';
import { Link } from 'wouter';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setShowError(false);
      await login(data.username, data.password);
      setLocation('/');
    } catch (error) {
      console.error('Login error:', error);
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <FileCard className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-primary">DDAS</CardTitle>
          <p className="text-sm text-gray-500">Data Download Duplication Alert System</p>
        </CardHeader>
        <CardContent>
          {showError && (
            <div className="bg-red-500 text-white p-4 mb-6 rounded-md">
              <div className="font-bold">Login failed</div>
              <div>401: Invalid credentials</div>
            </div>
          )}
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
                    </FormControl>
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
                      <Input 
                        type="password" 
                        placeholder="Enter your password" 
                        autocomplete="current-password" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  
                )}
              />
              
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </FileCard>
    </div>
  );
}
