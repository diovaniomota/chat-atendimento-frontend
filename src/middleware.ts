import { NextRequest, NextResponse } from "next/server";
import { haldleGetUser } from "./lib/server/auth";

export async function middleware(request: NextRequest) {
    const user = await haldleGetUser()

    // redirect to singin if user is not authenticated
    if ( request.nextUrl.pathname.startsWith('/auth') && !user){
        return NextResponse.redirect(new URL('/auth/signin', request.url))
    }

    // redirect to home if is authenticated
    if (request.nextUrl.pathname.startsWith('/auth') && user) {
        return NextResponse.redirect(new URL('/', request.url))
    }

}

export const config = {
    matcher: '/((?!.*\\..*|_next).*)'
}