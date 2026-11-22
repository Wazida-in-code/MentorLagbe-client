'use server'
import { protectedMutation } from "./server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL 

export const updateProfile = async (
  id: string,
  updatedData: {
    name: string;
    phone: string;
    bio: string;
    image: string;}) => {

      const api = `${BASE_URL}/update-profile/${id}`
      const res = await protectedMutation(api, "PATCH", updatedData)
      return res.json();
};