const mongoose = require("mongoose");

const formModel = new mongoose.Schema(
  {
    userId: {
        type : String,
        ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    fields: [
      {
        label: {
          type: String,
        },
        type: {
          type: String,
          enum: ["checkbox", "radio", "long", "short", "file"],
        },
        required: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Form", formModel);
