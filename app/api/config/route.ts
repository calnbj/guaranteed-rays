import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    name: "Guaranteed Rays",
    status: "Live",
    description: "Find the sunniest beer gardens in London.",
    url: "https://guaranteed-rays.vercel.app"
  }, {
    headers: {
      'Access-Control-Allow-Origin': '*', // This lets your portfolio read the data
    }
  });
}
