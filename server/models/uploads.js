const mongoose = require('mongoose');

const newUploadSchema = new mongoose.Schema({
    sampleFile: String
});

var uploads = mongoose.model('posts', newUploadSchema);

module.exports = uploads;