"use client";

import {z} from 'zod';
import {useForm, zodResolver} from '@mantine/form';
import {NumberInput, TextInput, Button, Box, Group, PasswordInput} from '@mantine/core';
import Link from "next/link";
import {NoticeMessage, SectionContainer} from "tp-kit/components";
import {useZodI18n} from "tp-kit/components/providers";
import {useState} from "react";
import {redirect, useRouter} from "next/navigation";
import {createSupabaseClient} from "@supabase/auth-helpers-shared";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";

const schema = z.object({
    email: z.string().email().nonempty(),
    password: z.string().min(6),
});

type FormValues = z.infer<typeof schema>;

export const Form = function () {
    // Applique les traductions à zod
    useZodI18n(z);

    const router = useRouter();

    const supabase = createClientComponentClient();

    const form = useForm<FormValues>({
        validate: zodResolver(schema),
        initialValues: {
            email: '',
            password: '',
        },
    });


    const handleSignIn = async (values: {email:string, password:string}) => {
        console.log(1)

        const signin = await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password,
        });

        console.log(2)

        if (signin.error) {
            console.log(signin.error);
        } else{
            router.push('/mon-compte')
            router.refresh()
        }
    }

    return (
        <SectionContainer wrapperClassName="max-w-5xl">
            <Box maw={350} mx="auto" className="shadow-md my-5 bg-white rounded">
                <form className="p-5" onSubmit={form.onSubmit(values => handleSignIn(values))}>
                    <h1 className="mb-3">CONNEXION</h1>
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

                    <Button type="submit" className="bg-green-600 my-5 h-75 items-center hover:bg-green-600 h-12"
                            fullWidth>
                        Me connecter
                    </Button>
                    <Link href={'../inscription'}><p className="text-sm text-center text-green">Créer un compte</p>
                    </Link>
                </form>
            </Box>
        </SectionContainer>
    );
}