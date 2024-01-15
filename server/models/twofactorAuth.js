const mongoose = require("mongoose");

const twoFactorAuthData = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    secret: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const twoFAData = mongoose.model("2FAData", twoFactorAuthData);

module.exports = twoFAData