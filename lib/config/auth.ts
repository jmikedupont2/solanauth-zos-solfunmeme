import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SigninMessage } from "../SigninMessage";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            id: "signMessage",
            name: "Solana",
            credentials: {
                message: {
                    label: "Message",
                    type: "text",
                },
                signature: {
                    label: "Signature",
                    type: "text",
                },
            },
            async authorize(credentials, req) {
                try {
                    const signinMessage = new SigninMessage(
                        JSON.parse(credentials?.message || "{}"),
                    );

                    const csrfToken = await getCsrfToken({ req: { ...req, body: null } });

                    if (!csrfToken) {
                        console.error("No CSRF token found");
                        return null;
                    }

                    if (signinMessage.nonce !== csrfToken) {
                        console.error("CSRF token mismatch", {
                            messageNonce: signinMessage.nonce,
                            csrfToken
                        });
                        return null;
                    }

                    const validationResult = await signinMessage.validate(
                        credentials?.signature || "",
                    );

                    if (!validationResult)
                        throw new Error("Could not validate the signed message");

                    return {
                        id: signinMessage.publicKey,
                    };
                } catch (e) {
                    console.error("Authorization error:", e);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, token }) {
            // @ts-expect-error
            session.publicKey = token.sub;
            if (session.user) {
                session.user.name = token.sub;
            }
            return session;
        },
    },
};