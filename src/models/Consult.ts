// models/consultation.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IConsultation extends Document {
  name: string;
  email: string;
  question: string;
}

const ConsultationSchema = new Schema<IConsultation>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  question: { type: String, required: true },
});

const ConsultationModel = mongoose.model<IConsultation>('Consultation', ConsultationSchema);

export default ConsultationModel;
