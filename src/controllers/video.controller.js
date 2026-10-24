// video.controller.js
//
// TASK 2 — Implement the CRUD handlers (createVideo, getVideo, deleteVideo).
// TASK 3 — Implement the aggregation handler (topVideos).
//
// Copy the pattern from channel.controller.js EXACTLY:
//   async/await + try/catch  ->  ONE Mongoose op  ->  send response.
//   On any throw, call next(err). Never format errors here.

import mongoose from "mongoose";
import { Video } from "../models/video.model.js";

export async function createVideo(req, res, next) {
  try {
    const video = await Video.create(req.body);

    res.status(201).json(video);
  } catch (err) {
    next(err);
  }
}

export async function getVideo(req, res, next) {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        error: "Video not found",
      });
    }

    res.json(video);
  } catch (err) {
    next(err);
  }
}

export async function deleteVideo(req, res, next) {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);

    if (!video) {
      return res.status(404).json({
        error: "Video not found",
      });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function topVideos(req, res, next) {
  try {
    const channelId = new mongoose.Types.ObjectId(req.params.id);

    const videos = await Video.aggregate([
      {
        $match: {
          channelId,
        },
      },
      {
        $sort: {
          views: -1,
        },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          title: 1,
          views: 1,
        },
      },
    ]);

    res.json({
      channelId: req.params.id,
      count: videos.length,
      videos,
    });
  } catch (err) {
    next(err);
  }
}