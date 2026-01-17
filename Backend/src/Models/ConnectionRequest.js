const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: {
        values: ["Interested", "Ignored", "Accepted", "Rejected"],
        message: "status `{VALUE}` is not allowed",
      },
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Connection", connectionRequestSchema);
