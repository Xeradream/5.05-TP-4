"use client";
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import {SectionContainer} from "tp-kit/components";
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { PasswordInput, TextInput, Button, Box, Group } from '@mantine/core';
import Link from "next/link";

const schema = z.object({
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(8,{message: 'Invalid password'}),
});


export default function Inscription() {
        const form = useForm({
            validate: zodResolver(schema),
            initialValues: {
                email: '',
                password: '',
            },
        });

        return (
            <SectionContainer wrapperClassName="max-w-5xl">
            <Box maw={350} mx="auto" className="shadow-md my-5 bg-white rounded">
                <form onSubmit={form.onSubmit((values) => console.log(values))} className="p-5">
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

                    <Button type="submit" className="bg-green-600 my-5 items-center hover:bg-green-600 h-12"
                            fullWidth="true">
                        Me connecter
                    </Button>
                    <Link href={'../inscription'}><p className="text-sm text-center text-green">Créer un compte</p></Link>
                </form>
            </Box>
        </SectionContainer>
        );
    }