import { Axios } from "axios";

const httpClient = new Axios();

interface Params {
  name: string;
  email: string;
  phone: string;
}

export async function saveLead(params: Params) {
  console.log(params);
  const { data, status } = await httpClient.post(
    "https://save-lead-14743591223.us-central1.run.app",
    JSON.stringify(params),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (status !== 200) {
    throw Error("Error when trying to save lead");
  }

  console.log("Lead save successfully");
  return data;
}
