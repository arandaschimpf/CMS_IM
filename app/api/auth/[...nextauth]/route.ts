import prismadb from "@/lib/prismdb";
import { compare } from "bcrypt";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
        session: {
        strategy: "jwt",
    }, 
    providers: [
        CredentialsProvider({
            name: 'Sign in', 
            credentials:{
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "eze@gmail.com"
                }, 
                password: {
                    label: "Password",
                    type: "password",
                }
            },
            
            async authorize(credentials ) {
                if(!credentials?.email || !credentials.password){
                    return null;
                }

                const user = await prismadb.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if(!user){
                    return null;
                }

                const isPasswordValid = await compare(
                    credentials.password,
                    user.password
                )

                if(!isPasswordValid){
                    return null;
                }

                return {
                    id: user.id + '',
                    email: user.email,
                    name: user.name,
                    role: user.userRole,
                }
            }
        })
    ], 
    callbacks:{ 
        session: ({session, token}) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    name: token.name,
                    email: token.email,
                    role: token.role,
                }
            }
        }, 
        jwt: ({token, user}) => {
            if(user){
                const u = user as unknown as any
                return {
                    ...token, 
                    id: u.id, 
                    name: u.name,
                    email: u.email,
                    role: u.role,
                }
            }
            return token
        }
    }
}

const handler = NextAuth(authOptions); 

export { handler as GET, handler as POST };

