import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { BASE_API_URL } from './global'

export async function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const role = request.cookies.get('role')?.value
  const pathname = request.nextUrl.pathname


  // kalau tidak ada token sama sekali
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (token) {
    try {
      if(role == "admin"){
        const res = await fetch(`${BASE_API_URL}/admin/getbarang`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!res.ok) {
          return NextResponse.redirect(new URL('/admin/login', request.url))
        }
      } else if(role == "user"){
        const res = await fetch(`${BASE_API_URL}/user/getbarang`, {
          method: 'GET',
          headers: {  
            Authorization: `Bearer ${token}`,
          },
        })
        if (!res.ok) { 
          return NextResponse.redirect(new URL('/admin/login', request.url))
        }
      } else {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }
    } catch (err) {
      console.log('ERROR VALIDATE TOKEN:', err)
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  } else {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*','/user/:path*'],
}