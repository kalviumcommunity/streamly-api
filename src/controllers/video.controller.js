import mongoose from "mongoose";
import { Video } from "../models/video.model.js";

export const createVideo = async (req, res, next) => {
  try {
    const video = await Video.create(req.body);
    res.status(201).json(video);
  } catch (err) {
    next(err);
  }
};

export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const topVideos = async (req, res, next) => {
  try {
    const channelId = new mongoose.Types.ObjectId(req.params.id);

    const videos = await Video.aggregate([
      { $match: { channelId } },
      { $sort: { views: -1 } },
      { $limit: 10 },
      { $project: { title: 1, views: 1 } },
    ]);

    res.status(200).json({
      channelId: req.params.id,
      count: videos.length,
      videos,
    });
  } catch (err) {
    next(err);
  }
};

const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    const errors = {};
    for (const field in err.errors) {
      errors[field] = err.errors[field].message;
    }
    return res.status(400).json({ errors });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format",
      path: err.path,
    });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      message: `Duplicate value for field: ${field}`,
    });
  }

  res.status(500).json({ message: "Something went wrong" });
};

export default errorHandler;