'use server'
import { authFetch } from "./server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export const getUsers = async () => {
    const res = await authFetch(`${BASE_URL}/users`)
    return res.json()
}