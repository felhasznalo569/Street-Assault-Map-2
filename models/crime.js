const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const crimeSchema = new Schema({
  name: String,
  description: String,
  when: Date,
  timeofday: String,
  location: { type: { type: String }, coordinates: [Number] }
});
crimeSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Crime', crimeSchema);
