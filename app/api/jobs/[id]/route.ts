import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Job } from "@/app/models/Job";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const body = await req.json();
  const id = await params;
  const updated = await Job.findByIdAndUpdate(id, body, {
    new: true,
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const id = await params;
  await Job.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}
