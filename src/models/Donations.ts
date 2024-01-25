// models/donation.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IDonation extends Document {
  image: string;
  title: string;
  text: string;
}

const DonationSchema = new Schema<IDonation>({
  image: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
});

const DonationModel = mongoose.model<IDonation>('Donation', DonationSchema);

export default DonationModel;
