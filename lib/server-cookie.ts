'use server';
import { cookies } from "next/headers"

export async function getServerCookie(key: string) {
    return (await cookies()).get(key)?.value || ''
}

export async function storeServerCookie(key: string, plainText: string) {
    (await cookies()).set({
        name: key,
        value: plainText,
        maxAge: 60 * 60 * 24, // 1 day  
    })
}

export async function removeServerCookie(key: string) {
    (await cookies()).delete(key)
}