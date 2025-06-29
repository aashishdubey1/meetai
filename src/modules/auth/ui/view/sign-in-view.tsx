'use client';
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { OctagonAlertIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Card, CardContent } from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { Alert,AlertTitle } from '@/components/ui/alert';
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage} from '@/components/ui/form'
import { useForm } from 'react-hook-form';
import { authClient } from '@/lib/auth-client';

const formSchema = z.object({
    email:z.string().email(),
    password:z.string().min(1,{message:"Password is Required"})
})


export const SignInView = ()=>{

    const router = useRouter();
    const [error,setError] = useState<string | null>(null);
    const [pending,setPending] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            email:"",
            password:""
        }
    })

    const onSubmit = async (data: z.infer<typeof formSchema>)=>{
        setError(null)
        setPending(true)
        authClient.signIn.email(
            {
                email:data.email,
                password:data.password
            },
            {
                onSuccess:()=>{
                    setPending(false)
                    router.push('/')
                },
                onError:({error})=>{
                    setError(error.message)
                }
            }
        )
    }


    return (
        <div className="flex flex-col gap-6">
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <Form {...form}>
                        <form className='p-6 md-o-8' onSubmit={form.handleSubmit(onSubmit)}>
                            <div className='flex flex-col gap-6'>
                                <div className='flex flex-col items-center text-center'>
                                    <h1 className='text-3xl font-bold'>Welcome Back</h1>
                                    <p className='text-muted-foreground text-balance'>Login to your account</p>
                                </div>
                                <div className='grid gap-3'>    
                                    <FormField
                                    control={form.control}
                                    name='email'
                                    render={({field})=>(
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    type='email'
                                                    placeholder='ad@gmail.com'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                </div>
                                <div className='grid gap-3'>    
                                    <FormField
                                    control={form.control}
                                    name='password'
                                    render={({field})=>(
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    type='password'
                                                    placeholder='******'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                </div>
                                {!!error && (
                                    <Alert className='bg-destructive/20 border-none'>
                                        <OctagonAlertIcon className='h-4 w-4 !text-destructive'/>
                                        <AlertTitle>{error}</AlertTitle>
                                    </Alert>
                                )}
                                <Button disabled={pending} className='w-full' type='submit'>Sign in</Button>
                                <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
                                    <span className='bg-card text-muted-foreground relative z-10 px-2'>Or continue with</span>
                                </div>
                                <div className='grid grid-cols-2 gap-4'>
                                    <Button disabled={pending} className='w-full' variant='outline' type='button'>
                                        Google
                                    </Button>
                                    <Button disabled={pending} className='w-full' variant='outline' type='button'>
                                        Github
                                    </Button>
                                </div>
                                <div className='text-center text-sm'>
                                    Don&apos;t have an account ? {" "}
                                    <Link href={'/sign-up'} className='underline underline-offset-4'>Sign up</Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                    <div className="hidden md:flex text-3xl relative flex-col items-center justify-center bg-radial from-teal-300 to-teal-600">
                        <img src="./logo.svg" alt="Image" className="h-[92px] w-[92px]" />  
                        <p className="text-3xl font-semibold text-white">Meet.Ai</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

