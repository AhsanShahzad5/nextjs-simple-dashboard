//this was temp data
/* 
const users = [
    {
        "id": 1,
        "name": "ahsan"
    },
    {
        "id": 2,
        "name": "hamza"
    },
]
const posts = [
    {
        "id": 1,
        "title": "ahsan",
        "body": "body1",
        "userId": 1
    },

    {
        "id": 2,
        "title": "ahsan2",
        "body": "body2",
        "userId": 2
    },

    {
        "id": 3,
        "title": "ahsan3",
        "body": "body3",
        "userId": 3
    }

] 

export const getAllPosts = async()=>{
    return posts
}
export const getPosts = async (id) => {
    const post = posts.find((post) => post.id === parseInt(id))
    return post; 
}
export const getUsers = async (id) => {
    return posts.find((user) => user.id === id)
}
*/
 import { unstable_noStore as noStore } from "next/cache";
import connectToDb from "./db";
import { Post, User } from "./models";

export const getPosts = async()=>{
    try {
       await connectToDb();
        const posts = await Post.find();
        //console.log(posts);
        return posts;
    } catch (error) {
        console.log(error);
        throw new Error("failed to fetch")
        
    }
}
export const getPost = async (slug) => {
    try {
        await connectToDb();
        const post = await Post.findOne({slug});
        console.log(post);
        console.log( "inside post",post.userId);
        return post;
    } catch (error) {
        console.log(error);
        throw new Error("failed to fetch")

        
    }
}
export const getUser = async ({id}) => {
    noStore();
    try {
        await connectToDb();
        // const user = await User.findById(id)
        //  console.log(id);
        // const id = id.toString();
        const user = await User.findOne({id})
        console.log(user);
        
        // const user = await User.find({id})
        return user;
    } catch (error) {
        console.log(error);
        throw new Error("failed to fetch")
        
    }
}
export const getUsers = async () => {
    try {
        await connectToDb();
        const users = await User.find();
        return users;
    } catch (error) {
        console.log(error);
        throw new Error("failed to fetch")
        
    }
}