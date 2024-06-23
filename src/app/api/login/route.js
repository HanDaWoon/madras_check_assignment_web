import { mFetch } from "@/util/MFetch";

export async function POST(req) {
  const formData = await req.json();

  const res = await mFetch("/user", {
    headers: {
      Authorization: `Basic ${btoa(`${formData.email}:${formData.password}`)}`,
    },
  });

  const data = await res.json();

  return Response.json(data);
}
