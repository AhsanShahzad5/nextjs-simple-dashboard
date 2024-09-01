//here we will use api calls in next js

import connectToDb from "@/lib/db";
import { Post } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async (request)=>{
    try {
        connectToDb()
        const posts = await Post.find();
        return NextResponse.json(posts);
    } catch (error) {
        console.log(error);
        throw new Error("failed to fetch posts")
    }
}