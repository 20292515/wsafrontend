import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const gateway = process.env.NEXT_PUBLIC_GATEWAY || process.env.NEXT_PUBLIC_GATEWAY_DEV;
const handler = NextAuth({
    providers: [
        CredentialsProvider({

            id: "username-login",
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: {  label: "Password", type: "password" }
            },

            async authorize(credentials, req) {
                try {
                    // call our api gateways login method which will return a JWT if successful
                    const response = await fetch(gateway + '/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(credentials)
                    });

                    // process response
                    if (response.ok) {
                        const user =  await response.json();
                        return {
                            id: user.SubscriberId,
                            name: user.SubscriberLogin,
                            email: user.SubscriberLogin,
                            userId: user.SubscriberId,
                            typeId: user.SubscriberTypeId,
                            access_token: user.jwt ,
                        }; 
                    }

                    // return if response not ok
                    return null; // incorrect username or password or error
                
                } catch (error) {
                    console.error(error);
                    return null;
                }
            },

        }),
    ],
    session: {
        strategy: "jwt",
    },
    jwt: {
        // The maximum age of the NextAuth.js issued JWT in seconds.
        // Defaults to `session.maxAge`.
        maxAge: 60 * 60 * 24 * 30,
        // You can define your own encode/decode functions for signing and encryption
    },
    callbacks: {
        async jwt({ token, user}) {
            // Include the access_token in the token object
            if (user) {
                token.access_token = user.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            // Include the access_token in the session object
            session.access_token = token.access_token;
            return session;
        }
    }
})

export {handler as GET, handler as POST}