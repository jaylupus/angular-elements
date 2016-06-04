var mongoose = require('mongoose');

var schema = new mongoose.Schema({

  fileName: {type: String, required:true},
  dataType:{type:String, enum:['network','linear'], default:'linear'},
  data: {type: String}
});

mongoose.model('DataSource', schema);