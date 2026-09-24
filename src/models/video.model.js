import mongoose from "mongoose";

// TODO: build the schema described above.

const videoSchema = new mongoose.Schema(
  {
    // TODO: title
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
      maxlength: 120,
    },

    // TODO: channelId
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      required: true,
    },

    // TODO: slug
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    // TODO: views
    views: {
      type: Number,
      default: 0,
      min: 0,
    },

    // TODO: status
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },

  { timestamps: true }
);

// TODO: export const Video = mongoose.model("Video", videoSchema);

export const Video = mongoose.model("Video", videoSchema);