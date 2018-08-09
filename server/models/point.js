const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const lang = require('./../config/lang/');

const Point = new Schema({
  location: {
    type: {
			type: String,
			default: 'Point'
		},
		coordinates: {
			type: [Number],
			required: [true, lang.validations.required]
		}
  },
  date: {
  	type: Date,
  	default: Date.now
  }
}, {
    versionKey: false,
    timestamps: true,
    usePushEach: true
});
Point.plugin(mongooseDelete, {
  'deletedAt': true,
  'deletedBy': true,
  'overrideMethods': 'all'
});

/**
 * Statics
 */
Point.statics = {
	listNotDeleted: function(options) {
    options = Object.assign({ 'deleted': false }, options);
    return this.find(options).exec();
  },
  listDeleted: function(options) {
    options = Object.assign({ 'deleted': true }, options);
    return this.find(options).exec();
  },
  listAll: function(options) {
    return this.find(options).exec();
  },
  listActives: function(options) {
  	options = Object.assign({ 'deleted': false, 'status': 'active' }, options);
  	return this.find(options).exec();
  }
};

mongoose.model('Point', Point);

