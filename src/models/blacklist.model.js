const mongoose = require('mongoose')

const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: [true, "Token is required to logout"],
  }
},{
  timestamps: true,
})

const tokenBlacklistModel = mongoose.model("blacklistedTokens", blacklistTokenSchema)

module.exports = tokenBlacklistModel