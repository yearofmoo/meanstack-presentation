var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    content: {
        type: String,
        default: '',
        trim: true
    }
});

ArticleSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

ArticleSchema.statics = {
    load: function(id, cb) {
      this.findOne({
          _id: id
      }).exec(cb);
    }
};

mongoose.model('Article', ArticleSchema);
