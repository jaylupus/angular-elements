app.config(function($stateProvider) {
  $stateProvider.
  state('project', {
    url: '/project/:id',
    templateUrl: '/js/projects/project.edit.html',
    controller:'ProjectEditCtrl',
    resolve: {
      project: function(ProjectFactory,$stateParams) {
        return ProjectFactory.getOne($stateParams.id);
      }
    }
  });
});

app.controller('ProjectEditCtrl', function($scope,$compile,$timeout){
  //$scope.project=project;
  //$scope.rows=project.config[0].pages.page_1.rows
// this is the app config 
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
 // console.log(obj);
// the cuurent object is a directive 
// if the current object is not a a directive obj then call with to the next sub-object
      if (obj.hasOwnProperty('ai_directive')) {
        if((obj['ai_directive_type'] ==='layout') && (obj['ai_directive_name'] === 'ai_col')){
                 $scope.appendTarget='#p_'+obj['ai_directive_page']+'_r_'+obj['ai_directive_row']+'_ai_row';
                  //console.log('>>>>>>>>'+appendTarget);
                  //$scope.appendTarget='#p_1_r_1_ai_row';
                  console.log(obj);
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
 console.log(obj);
// the cuurent object is a directive 
// if the current object is not a a directive obj then call with to the next sub-object
      if (obj.hasOwnProperty('ai_directive')) {
        if(obj['ai_directive_type'] ==='content'){
            $scope.appendTarget='#p_'+obj['ai_directive_page']+'_r_'+obj['ai_directive_row']+'_c_'+obj['ai_directive_col']+'_ai_col';
            console.log('>>>>>>>>'+ $scope.appendTarget);
            angular.element(document.querySelector( $scope.appendTarget )).append($compile('<'+obj['ai_directive_name']+' id="p_'+obj['ai_directive_page']+'_r_'+obj['ai_directive_row']+'_c_'+obj['ai_directive_col']+$scope.renderattributeString(obj['ai_directive_attributes'])+'></'+obj['ai_directive_name']+'>')($scope));
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
  },10);
  $timeout(function(){
     $scope.renderDirectiveHtmlFromAiConfig($scope.appConfig, '');
  },200);
},true);

$scope.addconfigObject=function(obj){
  $scope.appConfig.pages.page_1.rows.row_2.cols.col_2={
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
};


$timeout(function(){
     $scope.addconfigObject();
},5000);

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
app.directive('soloTable',function(dataFactory){
  return{
    restrict : 'EA',
    scope : {
      aiInfoSource : '@',
      aiInfoType : '@',
    },
    templateUrl :  'directiveStore/solotable/solo-table.html',
    //controller : function($scope, dataFactory){
    //$scope.data=dataFactory.getdata($scope.sectionLocation,$scope.sectionType);
    //},
    link : function(scope,elem,attr){
      // the link function is going to take all data requests and put them in an array of promisses
      //  for(var i=0;i< a.length;i++;){
          //if(a[i].indexOf(sectionLocation)) 
          scope.data=dataFactory.getdata(attr.aiInfoSource,attr.aiInfoType);
          
      //  }
    }
  };
});


app.directive('soloTableSort',function(dataFactory){
  return{
    restrict : 'EA',
    scope : {
      aiInfoSource : '@',
      aiInfoType : '@',
    },
    templateUrl :  'solo-table.html',
    //controller : function($scope, dataFactory){
    //$scope.data=dataFactory.getdata($scope.sectionLocation,$scope.sectionType);
    //},
    link : function(scope,elem,attr){
      // the link function is going to take all data requests and put them in an array of promisses
      //  for(var i=0;i< a.length;i++;){
          //if(a[i].indexOf(sectionLocation)) 
          scope.data=dataFactory.getdata(attr.aiInfoSource,attr.aiInfoType);
          
      //  }
    }
  };
});

app.factory('dataFactory',function($http){
  return{
   // this represents the result of opening a csv file turning it into a json array of objects
   // all factory function must be a promise to standardize the interface
    getdata :  function(dataSourceLocation,dataSourceType){
     // alert (dataSourceType);
      if(dataSourceType === 'file'){
      // put node fs asyncopen  
        return [
          {firstname:'first name', lastname:'last name', age : 'age'},
          {firstname:'John', lastname:'Doe', age : '22'},
          {firstname:'Bart', lastname:'Simson', age : '10'},
          {firstname:'Donald', lastname:'Trump', age : 'Dick'}
        ];
      }else if(dataSourceType === 'website'){
          return $http.get(dataSourceLocation);
      }
    }
  };
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

