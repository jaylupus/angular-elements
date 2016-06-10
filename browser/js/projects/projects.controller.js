app.controller('ProjectEditCtrl', function($scope,$compile,$timeout){
  //$scope.project=project;
  //$scope.rows=project.config[0].pages.page_1.rows
// this is the app config 

$scope.appConfigMaster={}; // this the version that is in sync with the database 0th position
$scope.appConfigEditCopy={}; // this is the copy of of object being edited that copied to appConfigViewDriver when;
$scope.appConfigViewDriver={}; // this is the copy of of object being edited that copied to appConfigViewDriver when

$scope.schema = {
    'type': 'object',
    'title': 'Solo Table',
    'properties': {
      'class': {
        'title': 'Class',
        'type': 'string'
      },
      'info_source': {
        'title': 'Info Source',
        'type': 'string'
      },
      'info_type': {
        'title': 'Info Type',
        'type': 'string',
        'enum': ['json', 'csv']
      }
    }
  };

$scope.model = {
    'info_source': 'Jonah'
  };

$scope.form = [
    "*", {
      type: "submit",
      title: "Save"
    }
];

$scope.appConfig={
    project_name : 'ourfirst app',
    pages:{
        page_1:{
          ai_directive : true,
          ai_directive_type : 'layout',
          ai_directive_name : 'ai_page',
          ai_directive_page : '1',
          ai_directive_row : '',
          ai_directive_col : '',
          ai_directive_attributes : {  
              ai_class : '/css/row_a/style.css',
              ai_page_title:'',
              ai_page_menu_text :''
          },
          rows:{
              row_1:{
                  ai_directive : true,
                  ai_directive_type : 'layout',
                  ai_directive_name : 'ai_row',
                  ai_directive_page : '1',
                  ai_directive_row : '1',
                  ai_directive_col : '',
                  ai_directive_attributes : {  
                      ai_class : '/css/row_a/style.css',
                  },
                  cols:{
                      col_1:{
                          ai_directive : true,
                          ai_directive_type : 'layout',
                          ai_directive_name : 'ai_col',
                          ai_directive_page : '1',
                          ai_directive_row : '1',
                          ai_directive_col: '1',
                          ai_directive_attributes : {  
                              ai_class : '/css/row_a/style.css',
                              class : 'col-md-6'
                          },
                          ai_content: {
                                ai_directive : true,
                                ai_directive_type : 'content',
                                ai_directive_name : 'solo_table',
                                ai_directive_page : '1',
                                ai_directive_row : '1',
                                ai_directive_col: '1',
                                ai_directive_attributes : { 
                                    ai_title: 'title',
                                    ai_class : 'myclass',
                                    ai_info_source : 'myclass',
                                    ai_info_type : 'file'
                                }
                        }
                    },col_2:{
                          ai_directive : true,
                          ai_directive_type : 'layout',
                          ai_directive_name : 'ai_col',
                          ai_directive_page : '1',
                          ai_directive_row : '1',
                          ai_directive_col: '2',
                          ai_directive_attributes : {  
                              ai_class : 'myclass',
                              class : 'col-md-6'
                          },
                          ai_content: {
                                ai_directive : true,
                                ai_directive_type : 'content',
                                ai_directive_name : 'solo_table',
                                ai_directive_page : '1',
                                ai_directive_row : '1',
                                ai_directive_col : '2',
                                ai_directive_attributes : { 
                                    ai_title: 'title',
                                    ai_class : 'myclass',
                                    ai_info_source : 'myclass',
                                    ai_info_type : 'file'
                                }
                        }
                    }  
                }
              },
              row_2:{
                 ai_directive : true,
                  ai_directive_type : 'layout',
                  ai_directive_name : 'ai_row',
                  ai_directive_page : '1',
                  ai_directive_row : '2',
                  ai_directive_col : '',              
                  ai_directive_attributes : {  
                      ai_class : '/css/row_a/style.css',
                  },
                 cols:{
                       col_1:{
                              ai_directive : true,
                              ai_directive_type : 'layout',
                              ai_directive_name : 'ai_col',
                              ai_directive_page : '1',
                              ai_directive_row : '2',
                              ai_directive_col: '1',
                              ai_directive_attributes : {  
                                  ai_class : '/css/row_a/style.css',
                                  class : 'col-md-6'
                              },
                              ai_content: {
                                        ai_directive : true,
                                        ai_directive_type : 'content',
                                        ai_directive_name : 'solo_table',
                                        ai_directive_page : '1',
                                        ai_directive_row : '2',
                                        ai_directive_col : '1',
                                        ai_directive_attributes : { 
                                            ai_title: 'title',
                                            ai_class : 'myclass',
                                            ai_info_source : 'myclass',
                                            ai_info_type : 'file'
                                        }
                              }
                      }
                 }
              }
            }
        }
    }
};

$scope.renderattributeString=function(obj){
    var attributeString='';
    for(var keys in obj){
      attributeString+=keys+'="'+obj[keys]+'" ';
    }
    return attributeString;
};

$scope.renderRowHtmlFromAiConfig=function(obj) {
      if (obj.hasOwnProperty('ai_directive')) {
        if((obj.ai_directive_type ==='layout') && (obj['ai_directive_name'] === 'ai_row')){
                  angular.element(workarea).append($compile('<'+obj['ai_directive_name']+' id="p_'+obj['ai_directive_page']+'_r_'+obj['ai_directive_row']+'_ai_row" '+ $scope.renderattributeString(obj['ai_directive_attributes'])+'></'+obj['ai_directive_name']+'>')($scope));
        }
      }
      for (var property in obj) {
                if(typeof obj[property] == "object"){
                    $scope.renderRowHtmlFromAiConfig(obj[property]); 
                }
      }
};    
$scope.renderColHtmlFromAiConfig=function(obj) {
      if (obj.hasOwnProperty('ai_directive')) {
        if((obj['ai_directive_type'] ==='layout') && (obj['ai_directive_name'] === 'ai_col')){
                 $scope.appendTarget='#p_'+obj['ai_directive_page']+'_r_'+obj['ai_directive_row']+'_ai_row';
                 // console.log(obj);
                  angular.element(document.querySelector( $scope.appendTarget )).append($compile('<'+obj['ai_directive_name']+' id="p_'+obj['ai_directive_page']+'_r_'+obj['ai_directive_row']+'_c_'+obj['ai_directive_col']+'_ai_col" '+ $scope.renderattributeString(obj['ai_directive_attributes'])+'></'+obj['ai_directive_name']+'>')($scope));
        }
      }
      for (var property in obj) {
                if(typeof obj[property] == "object"){
                    $scope.renderColHtmlFromAiConfig(obj[property]); 
                }
      }
};

$scope.renderDirectiveHtmlFromAiConfig=function(obj) {
// console.log(obj);
// the cuurent object is a directive 
// if the current object is not a a directive obj then call with to the next sub-object
      if (obj.hasOwnProperty('ai_directive')) {
        if(obj['ai_directive_type'] ==='content'){
            $scope.appendTarget='#p_'+obj['ai_directive_page']+'_r_'+obj['ai_directive_row']+'_c_'+obj['ai_directive_col']+'_ai_col';
  //          console.log('>>>>>>>>'+ $scope.appendTarget);
            angular.element(document.querySelector( $scope.appendTarget )).append($compile('<'+obj['ai_directive_name']+' id="p_'+obj['ai_directive_page']+'_r_'+obj['ai_directive_row']+'_c_'+obj['ai_directive_col']+'" '+$scope.renderattributeString(obj['ai_directive_attributes'])+'></'+obj['ai_directive_name']+'>')($scope));
        }
      }
      for (var property in obj) {
                if(typeof obj[property] == "object"){
                    $scope.renderDirectiveHtmlFromAiConfig(obj[property]);  
                }
      }
};
$scope.$watch('appConfig',function(){
  angular.element(workarea).empty();
  $scope.renderRowHtmlFromAiConfig($scope.appConfig, '');
  $timeout(function(){
    $scope.renderColHtmlFromAiConfig($scope.appConfig, '');
  },100);
  $timeout(function(){
     $scope.renderDirectiveHtmlFromAiConfig($scope.appConfig, '');
  },500);
},true);


$scope.editTestObject={
      ai_directive : true,
      ai_directive_type : 'layout',
      ai_directive_name : 'ai_col',
      ai_directive_page : '1',
      ai_directive_row : '2',
      ai_directive_col: '2',
      ai_directive_attributes : {  
          ai_class : '/css/row_a/style.css',
          class : 'col-md-6'
      },
      ai_content: {
                ai_directive : true,
                ai_directive_type : 'content',
                ai_directive_name : 'solo_table',
                ai_directive_page : '1',
                ai_directive_row : '2',
                ai_directive_col : '2',
                ai_directive_attributes : { 
                    ai_title: 'title',
                    ai_class : 'myclass',
                    ai_info_source : 'myclass',
                    ai_info_type : 'file'
                }
      }
};
$scope.editTestObject2={
      ai_directive : true,
      ai_directive_type : 'layout',
      ai_directive_name : 'ai_col',
      ai_directive_page : '1',
      ai_directive_row : '2',
      ai_directive_col: '2',
      ai_directive_attributes : {  
          ai_class : '/css/row_a/style.css',
          class : 'col-md-6'
      },
      ai_content: {
                ai_directive : true,
                ai_directive_type : 'content',
                ai_directive_name : 'solo_table',
                ai_directive_page : '1',
                ai_directive_row : '2',
                ai_directive_col : '2',
                ai_directive_attributes : { 
                    ai_title: 'My New Title',
                    ai_class : 'myclass',
                    ai_info_source : 'myclass',
                    ai_info_type : 'file'
                }
      }
};
//$scope.appConfig.pages.page_1.rows.row_2.cols.col_2={};

$scope.creatConfigObject=function(target,newelement,obj){
  //console.log(typeof target);
  target[newelement]=obj;
//  $scope.appConfig.pages.page_1.rows.row_2.cols.col_2=obj;   
};
$scope.readConfigObject=function(target,newelement){
  //console.log(typeof target);
  target[newelement]=obj;
//  $scope.appConfig.pages.page_1.rows.row_2.cols.col_2=obj;   
};
$scope.updateConfigObject=function(target,newelement,obj){
  //console.log(typeof target);
  target[newelement]=obj;
//  $scope.appConfig.pages.page_1.rows.row_2.cols.col_2=obj;   
};

$scope.deleteconfigObject=function(target,newelement){
  //console.log(typeof target);
  delete target[newelement];
//  $scope.appConfig.pages.page_1.rows.row_2.cols.col_2=obj;   
};

$scope.getNextRowPage=function(page){
  var newRow;
  return  newRow;
 };
$scope.getNextColumnInRow=function(page,row){
  var newCol;
  return  newCol;
};


$timeout(function(){
     $scope.creatConfigObject($scope.appConfig.pages.page_1.rows.row_2.cols,'col_2',$scope.editTestObject);
},3000);
/*
$timeout(function(){
     $scope.readConfigObject($scope.appConfig.pages.page_1.rows.row_2.cols,'col_2',$scope.editTestObject);
},3000);
*/
$timeout(function(){
     $scope.updateConfigObject($scope.appConfig.pages.page_1.rows.row_2.cols,'col_2',$scope.editTestObject2);
},6000);
/*
$timeout(function(){
     $scope.deleteconfigObject($scope.appConfig.pages.page_1.rows.row_2.cols,'col_2');
},9000);
*/
app.controller('ProjectEditCtrl', function($scope) {

  $scope.schema = {
    'type': 'object',
    'title': 'Solo Table',
    'properties': {
      'class': {
        'title': 'Class',
        'type': 'string'
      },
      'info_source': {
        'title': 'Info Source',
        'type': 'string'
      },
      'info_type': {
        'title': 'Info Type',
        'type': 'string',
        'enum': ['json', 'csv']
      }
    }
  };

  $scope.model = {
    'info_source': 'Jonah'
  };

  $scope.form = [
    "*", {
      type: "submit",
      title: "Save"
    }
  ];

});

});
app.factory('ProjectFactory', function($http) {
  var projectObj;
  var _projectCache = [];

  projectObj = {
    getAll: function() {
      return $http.get('/api/projects')
        .then(function(projects) {
          console.log(projects);
          angular.copy(projects.data, _projectCache);
          return _projectCache;
        });
    },

    getAllByUser: function(userId){
      return $http.get('/api/projects/user/' + userId)
          .then(function(projects){
            console.log(projects);
            angular.copy(projects.data, _projectCache);
            return _projectCache;
          })
    },

    getOne: function(id) {
      return $http.get('/api/projects/' + id)
        .then(function(project) {
          return project.data;
        });
    },

    add: function(project) {
      return $http({
            url: '/api/projects/',
            method: "POST",
            data: project
      })
        .then(function(_project) {
          return _project.data;
        });
    },

    delete: function(id){
      return $http.delete('/api/projects/' + id)
        .then(function(project) {
          return project.data;
        });
    },

    update: function(project) {
      return $http({
            url: '/api/projects/' + project._id,
            method: "PUT",
            data: project
      })
        .then(function(_project) {
          return _project.data;
        });
    },

    getDataSets: function(productId){
      return null;
    }

  };

  return projectObj;
});


app.directive('aiRow',function(){
  return{
    transclude : true,
    restrict : 'EA',
    scope : {
      inceptRowOrder : '@',
      inceptRowBgColor :  '@',
      inceptRowBgImage :  '@',
    },
    template :  ''
  };
});

app.directive('aiCol',function(){
  return{
    transclude : true,
    restrict : 'E',
    scope : {
      inceptionColId : '@',
      inceptionColWidth : '@',
      inceptionRowId : '@',
      inceptionColOrderInRow : '@'
    },
    template :  ''
  };
});

