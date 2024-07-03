"use server";

import { APIError } from "@/Types/Api";
import { cookies } from "next/headers";
import axios, { AxiosError } from "axios";

type Props = {
    endpoint: string,
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data?: object,
    withAuth?: boolean,
    withAttachment?: boolean
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL + '/api/v1';

export const api = async <TypeResponse>({
    endpoint,
    method = 'GET',
    data,
    withAuth = true,
    withAttachment = false
}: Props) => {
    const instance = axios.create({
        baseURL: BASE_URL
    });

    if (withAuth) {
        // getting auth cookie
        const sessionAuth = cookies().get(process.env.NEXT_PUBLIC_AUTH_KEY as string);

        if (sessionAuth?.value) {
            instance.defaults.headers.common['Authorization'] = `Bearer ${sessionAuth.value}`;
        }
    }

    if (withAttachment) {
        instance.defaults.headers.common['Content-Type'] = 'multipart/form-data';
    }

    try {
        const request = await instance.request<TypeResponse>({
            url: endpoint,
            method,
            params: method === 'GET' ? data : undefined,
            data: method !== 'GET' ? data : undefined
        });

        return {
            data: request.data
        };

    } catch (error) {
        const e = error as AxiosError<APIError>;

        return {
            error: {
                message: e.response?.data.detail ?? 'Ocorreu um erro inesperado'
            }
        };
    }
};
