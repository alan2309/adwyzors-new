import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Service } from "@/app/models/Service";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const body = await req.json();
  const id = await params;
  const updated = await Service.findByIdAndUpdate(id, body, {
    new: true,
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const id = await params;
  await Service.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}
