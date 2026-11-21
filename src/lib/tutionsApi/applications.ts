'use server'
import { authFetch, protectedMutation } from "../server";
import { ApplicationData } from "../tutionFormData";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";


export const createApplication = async (data:ApplicationData) => {
  const api = `${BASE_URL}/applications`
  const res = await protectedMutation(api, 'POST', data)
  return res.json()
};



export const getApplicationsCount = async (query = ''): Promise<{count:number}> => {
  const api = `${BASE_URL}/applications/count?${query}`
    const res = await authFetch(api)
    return res.json()
}


export const getApplications = async (query = '') => {
  const api = `${BASE_URL}/applications?${query}`
    const res = await authFetch(api)
    return res.json()
}

export const DeleteApplicationId = async (id: string) => {
  const res = await fetch(`${BASE_URL}/applications/${id}`, {
    method: "DELETE",
  });

  return res.json();
};



export const updateApplicationStatus = async (id: string, data: {status: string}) => {
  const res = await fetch(`${BASE_URL}/applications/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.json()
}