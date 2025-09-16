import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // required but NOT unique
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

const Subject = mongoose.model("Subject", subjectSchema);

// 🔑 Drop old unique index if it still exists in DB
Subject.collection.indexExists("title_1").then(exists => {
  if (exists) {
    Subject.collection
      .dropIndex("title_1")
      .then(() => console.log("✅ Dropped old unique index on title"))
      .catch(err => console.error("❌ Error dropping index:", err));
  }
});

export default Subject;
