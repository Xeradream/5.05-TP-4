"use client";
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import {SectionContainer} from "tp-kit/components";
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { PasswordInput, TextInput, Button, Box, Group } from '@mantine/core';

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
            <Box maw={340} mx="auto">
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <TextInput
                        withAsterisk
                        label="Email"
                        placeholder="example@mail.com"
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput
                        withAsterisk
                        label="Password"
                    />

                    <Group justify="flex-end" mt="xl">
                    <Button type="submit" className="bg-green-600 flex justify-center">
                    S'inscrire
                    </Button>
                    </Group>
                </form>
            </Box>
        );
    }