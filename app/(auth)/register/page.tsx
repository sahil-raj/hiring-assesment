'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { PasswordInput } from '@/components/ui/password-input';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { registerSchema } from '@/validations';
import { ApiClient } from '@/lib/api-client';

export default function RegisterPage() {
	const [isLoading, setIsLoading] = React.useState(false);
	const router = useRouter();

	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	async function onSubmit(values: z.infer<typeof registerSchema>) {
		setIsLoading(true);
		try {
			const res = await ApiClient.post<{ message: string }>('/api/auth/register', values);
			if (res.data) {
				toast.success(res.data.message);
				router.push('/login');
			} else {
				console.log(res.error);
				toast.error(res.error.message);
			}
		} catch {
			toast.error('An error occurred');
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className='flex h-screen w-screen flex-col items-center justify-center'>
			<Card className='w-full max-w-lg'>
				<CardHeader className='space-y-1'>
					<CardTitle className='text-center text-2xl'>Create an account</CardTitle>
					<CardDescription className='text-center'>Enter your information to create your account</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Full Name</FormLabel>
										<FormControl>
											<Input placeholder='John Doe' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder='example@email.com' type='email' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<PasswordInput placeholder='Create a password' {...field} />
										</FormControl>
										<FormDescription>
											Must contain at least 8 characters, one uppercase letter, and one number
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='confirmPassword'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm Password</FormLabel>
										<FormControl>
											<PasswordInput placeholder='Confirm your password' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type='submit' className='w-full' disabled={isLoading}>
								{isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
								Create Account
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter className='flex flex-col space-y-4'>
					<div className='relative w-full'>
						<div className='absolute inset-0 flex items-center'>
							<div className='border-muted w-full border-t' />
						</div>
						<div className='relative flex justify-center text-xs uppercase'>
							<span className='bg-background text-muted-foreground px-2'>Or continue with</span>
						</div>
					</div>
					<div className='grid grid-cols-2 gap-4'>
						<Button variant='outline'>Google</Button>
						<Button variant='outline'>GitHub</Button>
					</div>
					<p className='text-muted-foreground text-center text-sm'>
						Already have an account?{' '}
						<Link href='/login' className='hover:text-primary underline underline-offset-4'>
							Login here
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
