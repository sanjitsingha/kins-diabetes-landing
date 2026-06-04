import { NextResponse } from 'next/server'

export async function GET(request) {
  const { origin } = new URL(request.url)
  const response = NextResponse.redirect(origin + '/')

  // Server-side Set-Cookie is 100% reliable — browser must honour it
  const expiry = 'Thu, 01 Jan 1970 00:00:00 GMT'
  response.headers.append('Set-Cookie', `googtrans=; Path=/; Expires=${expiry}; SameSite=Lax`)
  response.headers.append('Set-Cookie', `googtrans=; Path=/; Expires=${expiry}; SameSite=Lax; Domain=${new URL(request.url).hostname}`)

  return response
}
