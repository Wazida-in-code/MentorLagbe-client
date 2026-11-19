import { TuitionDataType } from "../tutionFormData";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export const createTution = async (data: TuitionDataType) => {
  const res = await fetch(`${BASE_URL}/tuition`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json()
};



export const getTuition = async () => {
    const res = await fetch(`${BASE_URL}/tuition`);
    return res.json()
}