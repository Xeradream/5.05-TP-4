"use client";

import {ZodI18nProvider} from "tp-kit/components/providers";
import {Form} from "./form";

export default function connexion() {

    return <ZodI18nProvider><Form/></ZodI18nProvider>;

}