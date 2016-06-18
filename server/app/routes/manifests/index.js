'use strict';
var router = require('express').Router();
var fs = require('fs');
var sys = require('sys')
var exec = require('child_process').exec;
var child;

router.get('/',function(req,res,next){
// executes `pwd`
child = exec("cat browser/directiveStore/*/manifest.json", function (error, stdout, stderr) {
 //JSON.parse(stdout)
  res.json(JSON.parse('['+stdout+'{}]'));
});
	
	/*res.json([{
          ai_directive : true,
          ai_directive_type : 'content',
          ai_directive_name : 'solo_table',
          ai_directive_attributes : { 
              solo_table_title: 'title',
              solo_table_class : 'myclass',
              solo_table_info_source : 'myclass',
              solo_table_info_type : 'file'
          }
      },{
          ai_directive : true,
          ai_directive_type : 'content',
          ai_directive_name : 'solo_table',
          ai_directive_attributes : { 
              solo_table_title: 'title',
              solo_table_class : 'myclass',
              solo_table_info_source : 'myclass',
              solo_table_info_type : 'file'
          }
      },{
          ai_directive : true,
          ai_directive_type : 'content',
          ai_directive_name : 'solo_table',
          ai_directive_attributes : { 
              solo_table_title: 'title',
              solo_table_class : 'myclass',
              solo_table_info_source : 'myclass',
              solo_table_info_type : 'file'
          }
      }]);
      */
});
module.exports=router;