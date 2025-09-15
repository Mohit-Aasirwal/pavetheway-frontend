// app/api/resume/route.ts
import { ResumeData } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

// Simple in-memory store for demo purposes
// Replace with database in production
let resumeData: Partial<ResumeData> = {};

export async function POST(request: NextRequest) {
  try {
    const data = (await request.json()) as Partial<ResumeData>;
    resumeData = { ...resumeData, ...data };
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save resume data" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(resumeData);
}
