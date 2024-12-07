import {currentUser} from "@clerk/nextjs/server";


export async function isAdmin(): Promise<boolean> {
    const user  = await currentUser()

    return !(!user || user.publicMetadata.role !== "admin");
}

