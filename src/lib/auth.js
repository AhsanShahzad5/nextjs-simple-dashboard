//this file contains are auth providers
import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import connectToDb from "./db";
import { User } from "./models";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";


const login = async (credentials) => {
    try {
        connectToDb();
        const user = await User.findOne({ username: credentials.username });
        console.log(user, "coming in auth js file");
        
        // if (!user) throw new Error("Wrong credentials!");

        const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
        );

        if (!isPasswordCorrect) throw new Error("Wrong credentials!");

        return user;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to login!");
    }
};



export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [GitHub({
        clientId: process.env.AUTH_GITHUB_ID,
        clientSecret: process.env.AUTH_GITHUB_SECRET
    }),
    //this is to let the authentication stuff know that we r getting user from mongodb
    CredentialsProvider({
        async authorize(credentials) {
            try {
                const user = await login(credentials);
                return user;
            } catch (err) {
                return null;
            }
        }
    })

    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            console.log(user, account, profile);
            if (account.provider === "github") {
                connectToDb();
                try {
                    const user = await User.findOne({ email: profile.email });
                    if (!user) {
                        const newUser = new User({
                            username: profile.login,
                            email: profile.email,
                            image: profile.avatar_url,
                        });

                        await newUser.save();
                    }
                } catch (error) {
                    console.log(error);
                    return false
                }
            }
            return true
        },
        ...authConfig.callbacks,
    }
})