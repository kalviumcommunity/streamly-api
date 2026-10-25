// video.model.js
//
// TASK 1 — Define the Video schema WITH validators.
// Use channel.model.js as your reference for style.
//
// The schema must have these fields and rules:
//   title      String,  required (with a message), trimmed, maxlength 120
//   channelId  ObjectId, ref "Channel", required
//   slug       String,  required, UNIQUE, lowercase
//   views      Number,  default 0, min 0
//   status     String,  one of ["draft", "published"] (enum), default "draft"
//
// Enable timestamps so createdAt / updatedAt are added automatically.
// Export a model named "Video".


// TODO: build the schema described above.
// const videoSchema = new mongoose.Schema(
  {
    // TODO: title
    // TODO: channelId
    // TODO: slug
    // TODO: views
    // TODO: status
  }
  { /* TODO: timestamps */ }
 //

// TODO: export const Video = mongoose.model("Video", videoSchema);

import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
      maxlength: 120,
    },

    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    views: {
      type: Number,
      default: 0,
      min: 0,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);

export const Video = mongoose.model("Video", videoSchema);


