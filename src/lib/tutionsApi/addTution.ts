'use server'
import { protectedMutation } from "../server";
import { TuitionDataType } from "../tutionFormData";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export const createTution = async (data: TuitionDataType) => {
  const api = `${BASE_URL}/tuition`
  const res = await protectedMutation(api, 'POST', data)
  return res.json()
};


export const getBrowseTuition = async (query = "") => {
  const res = await fetch(
    `${BASE_URL}/browse-tuition?${query}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch tuitions");
  }

  return res.json();
};

export const getTuition = async (tutorId: string) => {
    const res = await fetch(`${BASE_URL}/tuition?tutorId=${tutorId}`);
    return res.json()
}


export const getTuitionsCount = async (tutorId: string): Promise<{ count: number }> => {
  console.log(tutorId);
  const res = await fetch(`${BASE_URL}/tuitions/count?tutorId=${tutorId}`);
  return res.json();
};



export const DeleteTuitionId = async( tuitionId : string ) => {
      const api = `${BASE_URL}/tuition/${tuitionId}`
      const res = await protectedMutation(api, "DELETE" )
        return res.json();
    }


export const getTuitionById = async(tuitionId:string) => {
  const res = await fetch(`${BASE_URL}/tuitions/${tuitionId}`)
  return res.json()
}


export const getAllTuition = async () => {
    const api = `${BASE_URL}/admin-tuitions`
    const res = await protectedMutation(api, 'get')
    return res.json()
}


export const updateTuitionStatus = async (tuitionId: string, approvalStatus: 'pending'|'approved'|'rejected') => {
    const api = `${BASE_URL}/admin-tuitions/${tuitionId}`
    const res = await protectedMutation(api, "PATCH", {approvalStatus})
    return res.json()
}


export const updateTuitionActive = async (id: string,isActive: boolean) => {
  const api = `${BASE_URL}/tuition-status/${id}`
  const res = await protectedMutation(api, "PATCH", {isActive})
  return res.json();
};


export const updateTuition = async (tuitionId:string, updatedTuition:object) => {
    const api = `${BASE_URL}/tuition/${tuitionId}`
    const res = await protectedMutation(api, "PATCH", updatedTuition)
    return res.json()
}


export const sixTuitions = async () => {
  const res = await fetch(`${BASE_URL}/six-tuitions`, {cache: 'no-store'})
  return res.json()
}


export const getTuitionCounts = async () => {
  const res = await fetch(`${BASE_URL}/tuition-counts`, {
    cache: "no-store",
  });

  return res.json();
};