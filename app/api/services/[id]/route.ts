import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Service } from '@/app/models/Service';

export async function PUT(req: Request, { params }: any) {
  await connectDB();
  const body = await req.json();
  const updated = await Service.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: any) {
  await connectDB();
  await Service.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Deleted' });
}
