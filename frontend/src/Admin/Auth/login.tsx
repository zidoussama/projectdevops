import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Lock, Mail, Shield } from 'lucide-react';
import axios from 'axios';
import Cookies  from 'js-cookie'


import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Minimum 8 caractères'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
            email: data.email,
            password: data.password,
        }
        );
        if(!response){
            throw new Error('Login failed');
        }
        const token = response.data.token;
        Cookies.set('authToken', token, { expires: 1 });
        window.location.href = '/admin/home';


    
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        
      }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-slate-900 to-black px-4">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg">
            <Shield className="text-white w-8 h-8" />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-white tracking-wide">
            JCI Admin
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Superuser Secure Access
          </p>
        </div>

        {/* Card */}
        <Card className="border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-center text-white text-xl">
              Connexion Administrateur
            </CardTitle>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <Input
                            {...field}
                            className="pl-10 bg-black/30 border-white/10 text-white focus:border-cyan-400"
                            placeholder="admin@jci.com"
                            disabled={isLoading}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Mot de passe</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <Input
                            {...field}
                            type={showPassword ? 'text' : 'password'}
                            className="pl-10 pr-10 bg-black/30 border-white/10 text-white focus:border-cyan-400"
                            placeholder="••••••••"
                            disabled={isLoading}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400"
                          >
                            {showPassword ? <EyeOff /> : <Eye />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 transition shadow-lg"
                >
                  {isLoading ? 'Connexion...' : 'Accéder au Dashboard'}
                </Button>
              </form>
            </Form>

            <div className="mt-4 text-center">
              <a className="text-sm text-cyan-400 hover:underline cursor-pointer">
                Mot de passe oublié ?
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-500">
          © 2026 JCI Béni Khiar — Admin System
        </p>
      </div>
    </div>
  );
}
