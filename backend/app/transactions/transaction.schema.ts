import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    date: { type: String, required: true },  // Storing date as a string (format: DD/MM/YYYY)
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    transaction_type: { type: String, required: true, enum: ["debit", "credit"] },
    category: { type: String, required: true },
    user_id: { type: String, required: true } // Assuming user_id is a string (like a card name)
}, { timestamps: true });

export default mongoose.model("Transaction", TransactionSchema);
