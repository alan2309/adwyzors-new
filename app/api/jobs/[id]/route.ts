import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Job } from '@/app/models/Job';

type Params = {
  params: {
    id: string;
  };
};

export async function PUT(req: Request, { params }: Params) {
  await connectDB();
  const body = await req.json();
  const updated = await Job.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: Params) {
  await connectDB();
  await Job.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Deleted' });
}
