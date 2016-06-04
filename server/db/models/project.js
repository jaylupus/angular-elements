var mongoose = require('mongoose');

var schema = new mongoose.Schema({

  name: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  projectConfig: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProjectConfig'
  },
  dataSource: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DataSource'
  }]
});

mongoose.model('Project', schema);