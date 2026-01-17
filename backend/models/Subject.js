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
// Only attempt this after the collection exists
Subject.collection.indexExists("title_1").then(exists => {
  if (exists) {
    Subject.collection
      .dropIndex("title_1")
      .then(() => console.log("✅ Dropped old unique index on title"))
      .catch(err => console.error("❌ Error dropping index:", err));
  }
}).catch(err => {
  // Collection doesn't exist yet - this is fine on first deployment
  if (err.code === 26) {
    console.log("ℹ️ Subjects collection doesn't exist yet - will be created on first insert");
  } else {
    console.error("❌ Error checking index:", err);
  }
});

export default Subject;
