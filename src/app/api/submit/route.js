import { NextResponse } from 'next/server'

const GAS_URL = process.env.GAS_WEB_APP_URL
const GAS_SECRET = process.env.GAS_SECRET

export async function POST(req) {
  try {
    if (!GAS_URL || !GAS_SECRET) {
      return NextResponse.json({ ok: false, error: 'GAS_WEB_APP_URL or GAS_SECRET not set on server' }, { status: 500 })
    }

    const body = await req.json()

    // forward to Apps Script
    const r = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...body, _secret: GAS_SECRET }),
    })

    const text = await r.text()
    try {
      const json = JSON.parse(text)
      return NextResponse.json(json, { status: r.status })
    } catch (err) {
      return NextResponse.json({ ok: false, error: text }, { status: r.status || 500 })
    }
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err.message) }, { status: 500 })
  }
}
