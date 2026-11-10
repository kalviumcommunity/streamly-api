
import mongoose from "mongoose";
import Video from "../models/video.model.js";

// CREATE VIDEO
export const createVideo = async (req, res, next) => {
  try {
    const video = await Video.create(req.body);

    res.status(201).json(video);
  } catch (err) {
    next(err);
  }
};

// GET VIDEO BY ID
export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};

// DELETE VIDEO BY ID
export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

// GET TOP 10 VIDEOS OF A CHANNEL
export const topVideos = async (req, res, next) => {
  try {
    const channelId = new mongoose.Types.ObjectId(req.params.id);

    const videos = await Video.aggregate([
      {
        $match: {
          channelId: channelId,
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

    res.status(200).json({
      channelId: req.params.id,
      count: videos.length,
      videos,
    });
  } catch (err) {
    next(err);
  }
};
