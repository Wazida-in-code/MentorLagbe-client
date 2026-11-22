import { authFetch } from "./server"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";


export const getTransaction = async () => {
    const res = await authFetch(`${BASE_URL}/transactions`)
    return res.json()
}