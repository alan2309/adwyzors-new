import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
    {
 title: { type: String, required: true },
  experience: { type: String, required: true },
  description: { type: String, required: true },
  requirements: [{ type: String }],
});

export const Job = mongoose.models.Job || mongoose.model('Job', JobSchema);
