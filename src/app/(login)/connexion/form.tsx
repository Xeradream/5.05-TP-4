"use client";

import {z} from 'zod';
import {useForm, zodResolver} from '@mantine/form';
import {NumberInput, TextInput, Button, Box, Group, PasswordInput} from '@mantine/core';
import Link from "next/link";
import {NoticeMessage, SectionContainer} from "tp-kit/components";
import {useZodI18n} from "tp-kit/components/providers";
import {useState} from "react";

const schema = z.object({
    email: z.string().email().nonempty(),
    password: z.string().min(6),
});

type FormValues = z.infer<typeof schema>;

export const Form = function () {
    // Applique les traductions à zod
    useZodI18n(z);

    const form = useForm<FormValues>({
        validate: zodResolver(schema),
        initialValues: {
            email: '',
            password: '',
        },
    });

    const [notices, setNotices] = useState([]);

    function Error(message) {
        setNotices([...notices, {type: "error", message}]);
    }

    function Success(message) {
        setNotices([...notices, {type: "success", message}]);
    }


    return (
        <SectionContainer wrapperClassName="max-w-5xl">
            <Box maw={350} mx="auto" className="shadow-md my-5 bg-white rounded">
                <form onSubmit={form.onSubmit((values) => {
                    if (values.name === 'error') {
                        Error("Cette adresse n'est pas disponible.");
                    } else {
                        Success("Votre inscription a bien été prise en compte. Validez votre adresse mail pour vous connecter");
                    }
                })} className="p-5">
                    <h1 className="mb-3">CONNEXION</h1>
                    {notices.map((notice, i) => (
                        <NoticeMessage key={i}{...notice}/>
                    ))}
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
                            fullWidth="true">
                        Me connecter
                    </Button>
                    <Link href={'../inscription'}><p className="text-sm text-center text-green">Créer un compte</p>
                    </Link>
                </form>
            </Box>
        </SectionContainer>
    );
}