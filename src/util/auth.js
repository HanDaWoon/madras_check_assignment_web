import { NextResponse } from "next/server";
import { mFetch } from "@/util/MFetch";

export async function withAuth(req) {
  try {
    const url = req.nextUrl.clone();
    url.pathname = "/login";

    const response = await validateUser(req);

    if (response.status === 200) return NextResponse.next();
    if (response.status === 401) return NextResponse.redirect(url);
  } catch (error) {
    console.log("err: ", error);
    throw new Error(`Couldn't check authentication`);
  }
}

export async function withoutAuth(req) {
  try {
    const url = req.nextUrl.clone();
    url.pathname = "/";

    const response = await validateUser(req);

    if (response.status === 200) return NextResponse.redirect(url);
    if (response.status === 401) return NextResponse.next();
  } catch (error) {
    console.log("err: ", error);
    throw new Error(`Couldn't check authentication`);
  }
}

function validateUser(req) {
  return mFetch("/user", { credentials: "include" });
}
