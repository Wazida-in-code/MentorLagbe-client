'use server'
import { authFetch } from "./server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export const getUsers = async () => {
    const res = await authFetch(`${BASE_URL}/users`)
    return res.json()
}


export const updateUserRole = async (userId: string, role: 'student'|'tutor'|'admin') => {
    const res = await fetch(`${BASE_URL}/users/${userId}/role`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({role}),
    });
    return res.json()
}


export const getProUsers = async (userId:string) => {
    const res = await fetch(`${BASE_URL}/users/${userId}/pro`)
    return res.json()
}