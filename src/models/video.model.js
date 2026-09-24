// video.model.js

import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Video title is required"],
      trim: true,
      maxlength: 120,
    },

    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      required: [true, "Channel is required"],
    },

    slug: {
      type: String,
      required: [true, "Video slug is required"],
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