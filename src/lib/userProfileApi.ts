const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export const updateProfile = async (
  id: string,
  updatedData: {
    name: string;
    phone: string;
    bio: string;
    image: string;
  }
) => {
  const res = await fetch(
    `${BASE_URL}/update-profile/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    }
  );

  return res.json();
};