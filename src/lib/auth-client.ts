import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
// Type-only import: erased at compile time, so no server code reaches the browser.
import type { auth } from "./auth"

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.BETTER_AUTH_URL,
    // Tells the client about extra user fields (role, plan, ...) so
    // authClient.signUp.email({ ..., role }) type-checks.
    plugins: [inferAdditionalFields<typeof auth>()],
})

export const { signIn, signUp, useSession } = authClient;
