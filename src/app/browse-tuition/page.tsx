import { getTuition } from "@/lib/tutionsApi/addTution";
import React from "react";

const BrowseTuitionPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const search = await searchParams;
  const urlSearch = new URLSearchParams(search as Record<string, string>);
  const query = urlSearch.toString();
  console.log(query);
  const tuitions = await getTuition(query);
  return (
    <div>
      <h1>BrowseTuitionPage;</h1>
      <ul>
        {tuitions.map((tuition) => (
          <li key={tuition._id}>{tuition.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default BrowseTuitionPage;
