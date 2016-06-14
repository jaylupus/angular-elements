
app.controller('ProjectEditCtrl', function($scope,$compile,$timeout){
// TEST THE FOLLOWING FUNCTIONS
// add a page
// add a row 
// add a column 
// add a directive


//$scope.project=project;
//$scope.rows=project.config[0].pages.page_1.rows
// this is the app config 

$scope.appConfigMaster={}; // this the version that is in sync with the database 0th position
$scope.appConfigEditCopy={}; // this is the copy of of object being edited that copied to appConfigViewDriver when;
$scope.appConfigViewDriver={}; // this is the copy of of object being edited that copied to appConfigViewDriver when
$scope.referenceToEditInAppConfig={};
$scope.allManifests=[];
/*
$scope.ai_manifest={
  'directiveName': 'am_d3_pie_chart',
  'dependancy_scripts_tags_for_head':[
        '<script src="https://d3js.org/d3.v3.min.js"></script>'
  ],
  'dependancy_scripts_tags_for_footer':[
        '<script src="https://d3js.org/d3.v3.min.js"></script>'
  ],
  directiveAttribute:{
    "width": "400",
    "height": "400",
    "radius" : "200",
    "colorScale": "d3.scale.category10"
  },
  directiveUsageInstructions : 'www.github/amen..../am_d3_pie_chart/gist.md' // location on the internet of you directive usage insruction for the user. we willload thi in an ifram
  };
*/
$scope.ai_page_manaifest={
          ai_directive : true,
          ai_directive_type : 'layout',
          ai_directive_name : 'ai_page',
          ai_directive_attributes : {  
              ai_class : '/css/row_a/style.css',
              ai_page_title:'',
              ai_page_menu_text :''
          }
};
// this object gets 
$scope.ai_row_manaifest={
    ai_directive : true,
    ai_directive_type : 'layout',
    ai_directive_name : 'ai_row',
    ai_directive_attributes : {  
        ai_class : '/css/row_a/style.css',
        class : 'row',
    }
};
$scope.ai_column_manaifest={
    ai_directive : true,
    ai_directive_type : 'layout',
    ai_directive_name : 'ai_col',
    ai_directive_attributes : {  
        ai_class : '/css/row_a/style.css',
        class : 'col-md-6'
    },
    ai_content : {}
};
$scope.solo_table_manifest={
    ai_directive : true,
    ai_directive_type : 'content',
    ai_directive_name : 'solo_table',
    ai_directive_attributes : { 
        solo_table_title: 'title',
        solo_table_class : 'myclass',
        solo_table_info_source : 'myclass',
        solo_table_info_type : 'file'
    }
};
$scope.solo_table2_manifest={
    ai_directive : true,
    ai_directive_type : 'content',
    ai_directive_name : 'solo_table',
    ai_directive_attributes : { 
        solo_table_title: 'title',
        solo_table_class : 'myclass',
        solo_table_info_source : 'myclass',
        solo_table_info_type : 'file'
    }
};
$scope.solo_table3_manifest={
    ai_directive : true,
    ai_directive_type : 'content',
    ai_directive_name : 'solo_table',
    ai_directive_attributes : { 
        solo_table_title: 'title',
        solo_table_class : 'myclass',
        solo_table_info_source : 'myclass',
        solo_table_info_type : 'file'
    }
};
$scope.allManifests[0]=$scope.ai_row_manaifest;
$scope.allManifests[1]=$scope.ai_column_manaifest;
$scope.allManifests[2]=$scope.solo_table_manifest;
$scope.allManifests[3]=$scope.solo_table2_manifest;
$scope.allManifests[4]=$scope.solo_table3_manifest;
/*
$scope.ai_manifest={
    directiveName: 'solo_table',
    directiveAttribute:{
        solo_table_title: 'title',
        solo_table_class : 'myclass',
        solo_table_info_source : 'myclass',
        solo_table_info_type : 'file'
    },
    dependancy_scripts_tags_for_head :[],
    dependancy_scripts_tags_for_footer :[],
    directiveUsageInstructions : 'www.github/amen..../am_d3_pie_chart/gist.md' // location on the internet of you directive usage insruction for the user. we willload thi in an ifram
};
*/

$scope.appConfig={
    project_name : 'ourfirst app',
    pages:{}
};

$scope.appConfig_test={
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
                      class : 'row',
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
                                    solo_table_title: 'title',
                                    solo_table_class : 'myclass',
                                    solo_table_info_source : 'myclass',
                                    solo_table_info_type : 'file'
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
                                    solo_table_title: 'title',
                                    solo_table_class : 'myclass',
                                    solo_table_info_source : 'myclass',
                                    solo_table_info_type : 'file'
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
                        class : 'row',
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
                                              solo_table_title: 'title',
                                              solo_table_class : 'myclass',
                                              solo_table_info_source : 'myclass',
                                              solo_table_info_type : 'file'
                                          }
                                }
                        }
                   }
              }
            }
        }
    }
};
$scope.editTestObject={
      ai_directive : true,
      ai_directive_type : 'layout',
      ai_directive_name : 'ai_col',
      ai_directive_attributes : {  
          ai_class : '/css/row_a/style.css',
          class : 'col-md-6'
      },
      ai_content: {
                ai_directive : true,
                ai_directive_type : 'content',
                ai_directive_name : 'solo_table',
                ai_directive_attributes : { 
                    solo_table_title: 'title',
                    solo_table_class : 'myclass',
                    solo_table_info_source : 'myclass',
                    solo_table_info_type : 'file'
                }
      }
};
$scope.editTestObject2={
      ai_directive : true,
      ai_directive_type : 'layout',
      ai_directive_name : 'ai_col',
      ai_directive_attributes : {  
          ai_class : '/css/row_a/style.css',
          class : 'col-md-6'
      },
      ai_content: {
                ai_directive : true,
                ai_directive_type : 'content',
                ai_directive_name : 'solo_table',
                ai_directive_attributes : { 
                    solo_table_title: 'My Results Table',
                    solo_table_class : 'myclass',
                    solo_table_info_source : 'myclass',
                    solo_table_info_type : 'file'
                }
      }
};

$scope.moveToEdit=function(configObject){
  $scope.referenceToEditInAppConfig=configObject;
  angular.copy(configObject,$scope.appConfigEditCopy);
};

$scope.saveEdit=function(){
    console.log('running save');
    angular.copy($scope.appConfigEditCopy,$scope.referenceToEditInAppConfig);
};

// this function takes your manifest object and add the ai-page,ai-row and ai-col attributes makeing is suitable for insertion into the appConfig
$scope.manifestToAppConfig=function(page,row,column,manifestObj){
  console.log(page);
  if(column > 0){
      manifestObj.ai_directive_page = page;
      manifestObj.ai_directive_row = row;
      manifestObj.ai_directive_col = column;
      return manifestObj;
  }else if(row > 0){
      manifestObj.ai_directive_page = page;
      manifestObj.ai_directive_row = row;
      manifestObj.ai_directive_col = '';
      return manifestObj;
  }else if(page > 0){
    console.log(manifestObj);
      manifestObj.ai_directive_page = page;
      manifestObj.ai_directive_row = '';
      manifestObj.ai_directive_col = '';  
      return manifestObj;
    }
};
// this function return a reference to the needed appConfig object


// This function renders the string of attributes to include in the directive being rendered
$scope.renderattributeString=function(obj){
    var attributeString='';
    for(var keys in obj){
      attributeString+=keys+'="'+obj[keys]+'" ';
    }
    return attributeString;
};  
$scope.renderPageHtmlFromAiConfig=function(obj) {

      if (obj.hasOwnProperty('ai_directive')) {
        if((obj.ai_directive_type ==='layout') && (obj['ai_directive_name'] === 'ai_page')){
                  angular.element(workarea).append($compile('<'+obj['ai_directive_name']+' id="p_'+obj['ai_directive_page']+'_r_'+obj['ai_directive_row']+'_ai_row" '+ $scope.renderattributeString(obj['ai_directive_attributes'])+'></'+obj['ai_directive_name']+'>')($scope));
        }
      }
      for (var property in obj) {
                if(typeof obj[property] == "object"){
                    $scope.renderRowHtmlFromAiConfig(obj[property]); 
                }
      }
};   
// this function append a compiled row into the DOM
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

// this function append a compiled Column into the DOM
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
// this function append a compiled Directive into the DOM
// just a note : I dont like the fact that I am using the directives Idea of where it is to render it I would rather use the 
// position of the last column i saw while iterating.
$scope.renderDirectiveHtmlFromAiConfig=function(obj) {
      if (obj.hasOwnProperty('ai_directive')) {
        if(obj['ai_directive_type'] ==='content'){
            $scope.appendTarget='#p_'+obj['ai_directive_page']+'_r_'+obj['ai_directive_row']+'_c_'+obj['ai_directive_col']+'_ai_col';
            angular.element(document.querySelector( $scope.appendTarget )).append($compile('<'+obj['ai_directive_name']+' id="p_'+obj['ai_directive_page']+'_r_'+obj['ai_directive_row']+'_c_'+obj['ai_directive_col']+'" '+$scope.renderattributeString(obj['ai_directive_attributes'])+'></'+obj['ai_directive_name']+'>')($scope));
        }
      }
      for (var property in obj) {
                if(typeof obj[property] == "object"){
                    $scope.renderDirectiveHtmlFromAiConfig(obj[property]);  
                }
      }
};

// this watch block renders a the dom when the appconfig changes
$scope.$watch('appConfig',function(){
  angular.element(workarea).empty();
 
  $scope.renderRowHtmlFromAiConfig($scope.appConfig, '');
  $timeout(function(){
    $scope.renderColHtmlFromAiConfig($scope.appConfig, '');
  },200);
  $timeout(function(){
     $scope.renderDirectiveHtmlFromAiConfig($scope.appConfig, '');
  },500);
},true);



// this function adds a new element to the config obj
$scope.creatConfigObject=function(target,obj){
  //target=obj;
  angular.copy(obj,target);
};
// this read a appConfig object
$scope.readConfigObject=function(target,newelement){
};
// this function updates a appconfig object
$scope.updateConfigObject=function(target,newelement,obj){
  target[newelement]=obj;
};
// this function deletes a object from the appConfig object
$scope.deleteconfigObject=function(target,subElement){
  delete target[subElement];
};
// this functon get the next row number to assgin for the current page
$scope.getNextRowPage=function(page){
  var newRow;
  return  newRow;
 };
// this functon get the next row and column number to assgin for the current page
$scope.getNextColumnInRow=function(page,row){
  var newCol;
  return  newCol;
};

// this function will return a reference to the needed config tagget
$scope.makeConfigTarget=function(page,row,column,landDirective){
  if(landDirective){
    if($scope.appConfig.pages['page_'+page]['rows']['row_'+row]['cols'].hasOwnProperty('col_'+column)){
      return $scope.appConfig.pages['page_'+page]['rows']['row_'+row]['cols']['col_'+column]['ai_content']={};
    }
  }else if(column){
    if(!$scope.appConfig.pages['page_'+page]['rows']['row_'+row].hasOwnProperty('cols')){$scope.appConfig.pages['page_'+page]['rows']['row_'+row]['cols']={}};
      return $scope.appConfig.pages['page_'+page]['rows']['row_'+row]['cols']['col_'+column]={};
  }else if(row){
      if(!$scope.appConfig.pages['page_'+page].hasOwnProperty('rows')){$scope.appConfig.pages['page_'+page]['rows']={}};
      return  $scope.appConfig.pages['page_'+page]['rows']['row_'+row]={};
  }else if(page){
    if(!$scope.appConfig.pages.hasOwnProperty('pages')){$scope.appConfig.pages={}; }
    return  $scope.appConfig.pages['page_'+page]={};
  }
};
// add a page
$scope.addNewPage=function(){
// get the next available page number
// call manifestToAppConfig on that page number to the config
// copy it to the edit object
// send it to the server 
// replace the appconfig the servers reply (now the server and the page are in sync)
// it will then take that page object and add it
$scope.configTarget=$scope.makeConfigTarget(1);
console.dir($scope.manifestToAppConfig(1,'','',$scope.ai_page_manaifest));
$scope.creatConfigObject($scope.configTarget,$scope.manifestToAppConfig(1,'','',$scope.ai_page_manaifest));
};

// add a row
$scope.addNewRow=function(){
// get the next available row number
// call manifestToAppConfig on that page number to the config
// copy it to the edit object
// send it to the server 
// replace the appconfig the servers reply (now the server and the page are in sync)
// it will then take that page object and add it
$scope.configTarget=$scope.makeConfigTarget(1,1);
//console.log($scope.configTarget);
console.log($scope.manifestToAppConfig(1,1,'',$scope.ai_row_manaifest));
$scope.creatConfigObject($scope.configTarget,$scope.manifestToAppConfig(1,1,'',$scope.ai_row_manaifest));
};
$scope.addNewColumn=function(){
// get the next available row number
// call manifestToAppConfig on that page number to the config
// copy it to the edit object
// send it to the server 
// replace the appconfig the servers reply (now the server and the page are in sync)
// it will then take that page object and add it
$scope.configTarget=$scope.makeConfigTarget(1,1,1);
console.log($scope.configTarget);
$scope.creatConfigObject($scope.configTarget,$scope.manifestToAppConfig(1,1,1,$scope.ai_column_manaifest));
$scope.addNewColumn2();
};
$scope.addNewColumn2=function(){
// get the next available row number
// call manifestToAppConfig on that page number to the config
// copy it to the edit object
// send it to the server 
// replace the appconfig the servers reply (now the server and the page are in sync)
// it will then take that page object and add it
$scope.configTarget=$scope.makeConfigTarget(1,1,2);
console.log($scope.configTarget);
$scope.creatConfigObject($scope.configTarget,$scope.manifestToAppConfig(1,1,2,$scope.ai_column_manaifest));

};
// add new directive NOTE: there is no add column because there is a one to one relationshiop between direstives and columns
$scope.addNewDirective=function(manifest){
// get the next available column number
// call manifestToAppConfig on that page number to the config
// copy it to the edit object
// send it to the server 
// replace the appconfig the servers reply (now the server and the page are in sync)
// it will then take that page object and add it
$scope.configTarget=$scope.makeConfigTarget(1,1,1,1);
console.log($scope.configTarget);
$scope.creatConfigObject($scope.configTarget,$scope.manifestToAppConfig(1,1,1,manifest));
$scope.moveToEdit($scope.configTarget);
};

$scope.addToPage=function(manifest){
  $scope.addNewDirective(manifest);
  $scope.DSopen=false;
  $scope.cplopen=true;
};

$timeout(function(){
  $scope.addNewPage();
/*
$scope.configTarget=$scope.makeConfigTarget(1);
console.log('$scope.configTarget >>>>>');
console.dir($scope.configTarget);
console.log('manifestToAppConfig');
console.dir($scope.manifestToAppConfig(1,'','',$scope.ai_page_manaifest));
     $scope.creatConfigObject($scope.configTarget,'page_1',$scope.manifestToAppConfig(1,'','',$scope.ai_page_manaifest));
*/
},100);

$timeout(function(){
  $scope.addNewRow();
    /*
     $scope.configTarget=$scope.makeConfigTarget(1);
console.log('$scope.configTarget');
     console.dir($scope.configTarget);
console.log('manifestToAppConfig');

     console.dir($scope.manifestToAppConfig(1,'','',$scope.ai_page_manaifest));
     $scope.creatConfigObject($scope.configTarget,'page_1',$scope.manifestToAppConfig(1,'','',$scope.ai_page_manaifest));
     */
     
},250);

$timeout(function(){
  $scope.addNewColumn();
    /*
     $scope.configTarget=$scope.makeConfigTarget(1);
console.log('$scope.configTarget');
     console.dir($scope.configTarget);
console.log('manifestToAppConfig');

     console.dir($scope.manifestToAppConfig(1,'','',$scope.ai_page_manaifest));
     $scope.creatConfigObject($scope.configTarget,'page_1',$scope.manifestToAppConfig(1,'','',$scope.ai_page_manaifest));
     */
},500);
$timeout(function(){
 // $scope.addNewDirective();
    /*
     $scope.configTarget=$scope.makeConfigTarget(1);
console.log('$scope.configTarget');
     console.dir($scope.configTarget);
console.log('manifestToAppConfig');

     console.dir($scope.manifestToAppConfig(1,'','',$scope.ai_page_manaifest));
     $scope.creatConfigObject($scope.configTarget,'page_1',$scope.manifestToAppConfig(1,'','',$scope.ai_page_manaifest));
     */
},1000);

/*
$timeout(function(){
    // $scope.readConfigObject($scope.appConfig.pages.page_1.rows.row_2.cols,'col_2',$scope.editTestObject);
},3000);

$timeout(function(){
     $scope.configTarget=$scope.makeConfigTarget(1,1,2);
     $scope.deleteconfigObject($scope.configTarget,'col_2');
},4000);

$timeout(function(){
     $scope.configTarget=$scope.makeConfigTarget(1,1,2);
    $scope.updateConfigObject($scope.configTarget,'col_2',$scope.editTestObject2);

},5000);
*/




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

app.directive('aiPage',function(){
  return{
    transclude : true,
    restrict : 'EA',
    scope : {
      aiClass : '/css/row_a/style.css',
      aiPageTitle:'',
      aiPageMenuText :''
    },
    template :  ''
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
app.directive('directiveShopCard',function(){
  return{
    restrict : "EA",
    scope : {
      manifest : '='
    },
    templateUrl :  'directiveStore/directiveStoreCard/card.html',
  };
});
