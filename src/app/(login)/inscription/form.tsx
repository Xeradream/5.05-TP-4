"use client";

import {z} from 'zod';
import {useForm, zodResolver} from '@mantine/form';
import {NumberInput, TextInput, Button, Box, Group, PasswordInput} from '@mantine/core';
import {SectionContainer, NoticeMessage} from "tp-kit/components";
import Link from "next/link";
import {useState, useEffect} from "react";
import {useZodI18n} from "tp-kit/components/providers";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

const schema = z.object({
    name: z.string().min(2),
    email: z.string().email().nonempty(),
    password: z.string().min(6),
});


type FormValues = z.infer<typeof schema>;

export const Form = function() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const supabase = createClientComponentClient()

    const handleSignUp = async (values) => {

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

        if (result.error != null) {
            error("Cette adresse n'est pas disponible.");
        } else {
            success("Votre inscription a bien été prise en compte. Validez votre adresse mail pour vous connecter");
        }
    }

    useZodI18n(z);

    const form = useForm<FormValues>({
        validate: zodResolver(schema),
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const [notices, setNotices] = useState([]);

    function error(message) {
        setNotices([...notices, {type: "error", message}]);
    }

    function success(message) {
        setNotices([...notices, {type: "success", message}]);
    }

    return (
        <SectionContainer wrapperClassName="max-w-5xl">
            <Box maw={340} mx="auto" className="shadow-lg p-7 my-2">

                {notices.map((notice, i) => (
                    <NoticeMessage key={i}{...notice}/>
                ))}

                <h1 className="mb-3">INSCRIPTION</h1>

                <form onSubmit={form.onSubmit((handleSignUp))}>

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
                        label="Email"
                        placeholder="example@mail.com"
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput
                        withAsterisk
                        label="Mot de passe"
                        placeholder=""
                        {...form.getInputProps('password')}
                    />

                    <Button type="submit" className="bg-green-600 flex justify-center my-5 hover:bg-green-700"
                            fullWidth="true">
                        S'inscrire
                    </Button>

                    <Link href="/connexion" className="text-green-700 flex justify-center">
                        Déjà un compte? Se connecter
                    </Link>
                </form>
            </Box>
        </SectionContainer>
);
}