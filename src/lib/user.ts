'use server'
import { authFetch, protectedMutation } from "./server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL 

export const getUsers = async () => {
    const res = await authFetch(`${BASE_URL}/users`)
    return res.json()
}


export const updateUserRole = async (userId: string, role: 'student'|'tutor'|'admin') => {
    const api = `${BASE_URL}/users/${userId}/role`
    const res = await protectedMutation(api, "PATCH", {role})
    return res.json()
}


export const getProUsers = async (userId:string) => {
    console.log(userId);
    const res = await fetch(`${BASE_URL}/users/${userId}/pro`)
    return res.json()
}