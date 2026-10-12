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

import mongoose from "mongoose";

// TODO: build the schema described above.

const videoSchema = new mongoose.Schema(

  {

    // TODO: title
    title: {
      type: String,
      required: [true, "Title is required"],
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