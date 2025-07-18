import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema(
    {
  title: String,
  description: String
});

export const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);
