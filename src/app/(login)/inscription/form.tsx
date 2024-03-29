"use client";

import {z} from 'zod';
import {useForm, zodResolver} from '@mantine/form';
import {TextInput, Button, Box, PasswordInput} from '@mantine/core';
import {NoticeMessage, SectionContainer} from "tp-kit/components";
import Link from "next/link";
import {useZodI18n, ZodI18nProvider} from "tp-kit/components/providers";
import {useState} from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

const schema = z.object({
    name: z.string().min(2),
    email: z.string().email().nonempty(),
    password: z.string().min(6),
});

type FormValues = z.infer<typeof schema>;

export const Form = function () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const supabase = createClientComponentClient()




    const handleSignUp = async (values:{email:string, password:string, name:string}) => {

        const result = await supabase.auth.signUp({
            email: values.email,
            password: values.password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
                data: {
                    name: values.name,
                }
            },
        })

        

        console.log(result);
    }
    // Applique les traductions à zod
    useZodI18n(z);

    const form = useForm<FormValues>({
        validate: zodResolver(schema),
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    return (
        <SectionContainer wrapperClassName="max-w-5xl">
            <Box maw={350} mx="auto" className="shadow-md my-5 bg-white rounded">
                <form onSubmit={form.onSubmit((handleSignUp))} className="p-5">
                        <h1 className="mb-3">INSCRIPTION</h1>

                        

                        <TextInput
                            withAsterisk
                            label="Name"
                            placeholder="John Doe"
                            description="Le nom qui sera utilisé pour vos commandes"
                            mt="sm"
                            {...form.getInputProps('name')}
                        />
                        <TextInput
                            withAsterisk
                            label="Adresse email"
                            placeholder="example@mail.com"
                            {...form.getInputProps('email')}
                        />
                        <PasswordInput
                            withAsterisk
                            label="Mot de passe"
                            placeholder=""
                            {...form.getInputProps('password')}
                        />

                        <Button type="submit" className="bg-green-600 my-5 items-center hover:bg-green-600 h-12"
                                fullWidth>
                            Créer un compte
                        </Button>
                        <Link href={'../connexion'}><p className="text-sm text-center text-green">Déjà un compte ? Se
                            connecter</p></Link>
                    </form>
            </Box>
        </SectionContainer>
    );
};