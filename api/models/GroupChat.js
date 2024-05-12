const mongoose = require("mongoose");

// Define group chat schema
const groupChatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model (assuming you have a User model)
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message", // Reference to the Message model (assuming you have a Message model)
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the group chat model
const GroupChat = mongoose.model("GroupChat", groupChatSchema);

module.exports = GroupChat;
