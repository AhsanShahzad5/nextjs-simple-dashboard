"use server"
//basically if we have a complex application , we will still use apis , but for basic stuff , we can just utililze server actions

import { revalidatePath } from "next/cache";
import connectToDb from "./db";
import { Post, User } from "./models";
import { auth, signIn , signOut } from "./auth";
import bcrypt from "bcryptjs";

//server action is always async 
//makes a post request
export const sayHello = async () => {
    //    "use server"
    console.log("first server action");

}

export const createPost = async (formData) => {
    //  "use server"
    //this is how we get data from form body
    const { title, desc, slug, userId } = Object.fromEntries(formData);

    try {
        connectToDb();
        const newPost = new Post({
            title, desc, slug, userId
        })
        await newPost.save();
        console.log("saved to db", newPost);
        //since we are cahcing , so we wont see changes immediatly in deployment mode , so this will refresh our page so we see changes immediatyl
        revalidatePath("/blog");

    } catch (error) {
        console.log(error);
        return { error: "failed to create" }
    }
}
export const deletePost = async (formData) => {
    // "use server"
    //this is how we get data from form body
    const { id } = Object.fromEntries(formData);

    try {
        connectToDb();
        await Post.findByIdAndDelete(id)
        console.log("Deleted from db");

        revalidatePath("/blog");

    } catch (error) {
        console.log(error);
        return { error: "failed to create" }
    }
}

export const handleGithubLogin = async () => {
    "use server"
    await signIn("github");

    const session = await auth();
    console.log(session)
}

export const handleLogout = async () => {
    "use server"

    await signOut("github")

}

export const register = async (previousState,formData) => {
    const { username, email, password, img, passwordRepeat } =
      Object.fromEntries(formData);
  
    if (password !== passwordRepeat) {
      return { error: "Passwords do not match" };
    }
  
    try {
      connectToDb();
  
      const user = await User.findOne({ username });
  
      if (user) {
        return { error: "Username already exists" };
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        img,
      });
  
      await newUser.save();
      console.log("saved to db");
      console.log(newUser);
      
      return { success: true };
    } catch (err) {
      console.log(err);
      return { error: "Something went wrong!" };
    }
  };

export const login = async (previousState,formData) => {
    const { username, password } =
      Object.fromEntries(formData);
      console.log(username , password);
      
      try {
        await signIn("credentials", { username, password });
      } catch (err) {
        console.log(err);
    
        if (err.message.includes("CredentialsSignin")) {
          return { error: "Invalid username or password" };
        }
        throw err;
      }
  };

  export const addUser = async (prevState,formData) => {
    const { username, email, password, img } = Object.fromEntries(formData);
  
    try {
      connectToDb();
      const newUser = new User({
        username,
        email,
        password,
        img,
      });
  
      await newUser.save();
      console.log("saved to db");
      revalidatePath("/admin");
    } catch (err) {
      console.log(err);
      return { error: "Something went wrong!" };
    }
  };
  
  export const deleteUser = async (formData) => {
    const { id } = Object.fromEntries(formData);
  
    try {
      connectToDb();
  
      await Post.deleteMany({ userId: id });
      await User.findByIdAndDelete(id);
      console.log("deleted from db");
      revalidatePath("/admin");
    } catch (err) {
      console.log(err);
      return { error: "Something went wrong!" };
    }
  };
  