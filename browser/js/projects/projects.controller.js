
app.controller('ProjectEditCtrl', function($scope,$compile,$timeout,project,manifestFactory,$stateParams,AuthService){
// TEST THE FOLLOWING FUNCTIONS
// add a page
// add a row
// add a column
// add a directive

// Project Id & User Id
$scope.projId = $stateParams.id;
var getUserId = function(){
  AuthService.getLoggedInUser().then(function (user){
    $scope.userId = user._id;
  })
}
getUserId();


// this is the app config
$scope.allManifests={};
$scope.appConfigMaster={}; // this the version that is in sync with the database 0th position
$scope.appConfigLayoutEditCopy={}
$scope.appConfigEditCopy={}; // this is the copy of of object being edited that copied to appConfigViewDriver when;
$scope.appConfigViewDriver={}; // this is the copy of of object being edited that copied to appConfigViewDriver when
$scope.referenceToEditInAppConfig={};
$scope.activeEdit={};
$scope.CurrentViewWidth='0';

$scope.project_info_sources=[{"id":"5765c87f0c9b38eff0f8dcb7","description":"this is an info"},{"id":"0930ej2n32dj023dn23d02n3d","description":"this is also an info"}];

manifestFactory.getAll()
.then(function(data){
  $scope.allManifests=data.data;
});

$scope.builtInManifests=[];
$scope.lastPage='0';
$scope.lastRow='0';
$scope.lastColumn='0';
// this object gets

$scope.ai_page_manifest={
    ai_directive : true,
    ai_directive_type : 'layout',
    ai_directive_name : 'ai_page',
    ai_directive_attributes : {
        ai_class : '/css/row_a/style.css',
        ai_page_title:'',
        ai_page_menu_text :''
    }
};

$scope.ai_row_manifest={
    ai_directive : true,
    ai_directive_type : 'layout',
    ai_directive_name : 'ai_row',
    ai_directive_attributes : {
        ai_class : '/css/row_a/style.css',
        'class' : 'row',
        'style' : '',
        'ai_bootstrap_width': {'xs':'12','sm':'12','md':'12','lg':'12','xl':'12'},
        'ai_bootstrap_show': {'xs':'true','sm':'true','md':'true','lg':'true','xl':'true'}
    }
};

$scope.ai_column_manifest={
    ai_directive : true,
    ai_directive_type : 'layout',
    ai_directive_name : 'ai_col',
    ai_directive_attributes : {
        ai_class : '/css/row_a/style.css',
        class : 'col-md-6',
        'ai_bootstrap_width': {'xs':'12','sm':'12','md':'12','lg':'12','xl':'12'},
        'ai_bootstrap_show': {'xs':'true','sm':'true','md':'true','lg':'true','xl':'true'}
    },
    ai_content : {}
};

$scope.builtInManifests[0]=$scope.ai_page_manifest;
$scope.builtInManifests[1]=$scope.ai_row_manifest;

// this function get the last page numb in config

$scope.getLastPage=function(){
  try{
    $scope.lastPage=0;
    for(var key in $scope.appConfig.pages){
        $scope.lastPage++;
    }
  }catch(e){}
};

// this function get the last row numb in config
$scope.getLastRow=function(){
  try{
      $scope.getLastPage();
      $scope.lastRow=0;
      for(var key in $scope.appConfig.pages['page_'+$scope.lastPage].rows){
          $scope.lastRow++;
      }
  }catch(e){}
};

// this function get the last col numb in config
$scope.getLastColumn=function(){
      $scope.getLastRow();
      $scope.lastColumn=0;
      console.log($scope.appConfig.pages['page_'+$scope.lastPage].rows['row_'+$scope.lastRow]);
      for(var key in $scope.appConfig.pages['page_'+$scope.lastPage].rows['row_'+$scope.lastRow]['cols']){
          $scope.lastColumn++;
          console.log(key);
      }
};

// this function takes a manifest and sets it up for being inserted into the appConfig.
// it does this bt adding the page,row,and,column properites.
$scope.moveConfigObjectToEdit=function(configObject){
  $scope.referenceToEditInAppConfig=configObject; // this is reference to the needed appConfig object
  angular.copy(configObject,$scope.appConfigEditCopy);
};

// this function moves the edit version of teh appconfig object beging edit from edit object to it place in te appConfig objec
$scope.saveEdit=function(){
    console.log('running save');
    angular.copy($scope.appConfigEditCopy,$scope.referenceToEditInAppConfig);
};

// this function takes your manifest object and add the ai-page,ai-row and ai-col attributes makeing is suitable for insertion into the appConfig
$scope.manifestToAppConfig=function(page,row,column,manifestObj){
  //console.log(page);
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
    //console.log(manifestObj);
      manifestObj.ai_directive_page = page;
      manifestObj.ai_directive_row = '';
      manifestObj.ai_directive_col = '';
      return manifestObj;
    }
};

// This function renders the string of attributes to include in the directive being rendered
$scope.renderattributeString=function(obj){
    var attributeString='';
    for(var keys in obj){
      attributeString+=keys+'="'+obj[keys]+'" ';
    }
    return attributeString;
};

// this function append a compiled page into the DOM
$scope.renderPageHtmlFromAiConfig=function(obj) {
      if (obj.hasOwnProperty('ai_directive')) {
        if((obj.ai_directive_type ==='layout') && (obj['ai_directive_name'] === 'ai_page')){
                  angular.element(workarea).append($compile('<'+obj['ai_directive_name']+' id="p_'+obj['ai_directive_page']+'_r_'+obj['ai_directive_row']+'_ai_row" '+ $scope.renderattributeString(obj['ai_directive_attributes'])+'></'+obj['ai_directive_name']+'>')($scope));
        }
      }
      for (var property in obj) {
                if(typeof obj[property] == "object"){
                    $scope.renderPageHtmlFromAiConfig(obj[property]);
                }
      }
};

// this function append a compiled row into the DOM
$scope.renderRowHtmlFromAiConfig=function(obj) {
  console.log(obj)
      if (obj.hasOwnProperty('ai_directive')) {
        if((obj.ai_directive_type ==='layout') && (obj['ai_directive_name'] === 'ai_row')){
                  //angular.element(workarea).append($compile('<'+obj['ai_directive_name']+' id="p_'+obj['ai_directive_page']+'_r_'+obj['ai_directive_row']+'_ai_row" '+ $scope.renderattributeString(obj['ai_directive_attributes'])+'></'+obj['ai_directive_name']+'>')($scope));
                  angular.element(workarea).append($compile('<div  id="p_'+obj['ai_directive_page']+'_r_'+obj['ai_directive_row']+'_ai_row" '+ $scope.renderattributeString(obj['ai_directive_attributes'])+'ng-class="getEditCandidate(\'p_'+obj['ai_directive_page']+'_r_'+obj['ai_directive_row']+'_ai_row\')"   ng-mouseenter="setEditCandidate(\'p_'+obj['ai_directive_page']+'_r_'+obj['ai_directive_row']+'_ai_row\')" ng-mouseleave="setEditCandidate(\'\')"><ai-edit-hot-spot set-active-edit-element="setEditSelect()" active-edit-element="editCandidate" ai-edit-hot-spot-id="p_'+obj['ai_directive_page']+'_r_'+obj['ai_directive_row']+'_ai_row"></ai-edit-hot-spot></div>')($scope));
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
                  angular.element(document.querySelector( $scope.appendTarget )).append($compile('<div id="p_'+obj['ai_directive_page']+'_r_'+obj['ai_directive_row']+'_c_'+obj['ai_directive_col']+'_ai_col" '+ $scope.renderattributeString(obj['ai_directive_attributes'])+' ng-class="getEditCandidate(\'p_'+obj['ai_directive_page']+'_r_'+obj['ai_directive_row']+'_c_'+obj['ai_directive_col']+'_ai_col\')" ng-mouseenter="setEditCandidate(\'p_'+obj['ai_directive_page']+'_r_'+obj['ai_directive_row']+'_c_'+obj['ai_directive_col']+'_ai_col\')" ng-mouseleave="setEditCandidate(\'p_'+obj['ai_directive_page']+'_r_'+obj['ai_directive_row']+'_ai_row\')"><ai-edit-hot-spot set-active-edit-element="setEditSelect()" active-edit-element="editCandidate" ai-edit-hot-spot-id="p_'+obj['ai_directive_page']+'_r_'+obj['ai_directive_row']+'_c_'+obj['ai_directive_col']+'_ai_col"></ai-edit-hot-spot></div>')($scope));
        }
      }
      for (var property in obj) {
                if(typeof obj[property] == "object"){
                    $scope.renderColHtmlFromAiConfig(obj[property]);
                }
      }
};

$scope.renderClearfixHtmlFromAiConfig=function(obj) {
      if (obj.hasOwnProperty('ai_directive')) {
        if((obj['ai_directive_type'] ==='layout') && (obj['ai_directive_name'] === 'ai_row')){
                 $scope.appendTarget='#p_'+obj['ai_directive_page']+'_r_'+obj['ai_directive_row']+'_ai_row';
                  angular.element(document.querySelector( $scope.appendTarget )).append($compile('<div class="clearfix"></div><hr>')($scope));
        }
      }
      for (var property in obj) {
                if(typeof obj[property] == "object"){
                    $scope.renderClearfixHtmlFromAiConfig(obj[property]); 
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
$scope.addNewPage=function(page,manifest){
  // get the next available page number
  // call manifestToAppConfig on that page number to the config
  $scope.configTarget=$scope.makeConfigTarget(1);
  // copy it to the edit object
  // send it to the server
  // replace the appconfig the servers reply (now the server and the page are in sync)
  // it will then take that page object and add it
  console.dir($scope.manifestToAppConfig(1,'','',manifest));
  $scope.creatConfigObject($scope.configTarget,$scope.manifestToAppConfig(page,'','',manifest));
};
// add a row
$scope.addNewRow=function(page,row,manifest){
  console.log(page,row)
  // call manifestToAppConfig on that page number to the config
  $scope.configTarget=$scope.makeConfigTarget(page,row);
  // copy it to the edit object
  // send it to the server
  // replace the appconfig the servers reply (now the server and the page are in sync)
  // it will then take that page object and add it
  //console.log($scope.configTarget);
  console.log($scope.manifestToAppConfig(page,row,'',manifest));
  $scope.creatConfigObject($scope.configTarget,$scope.manifestToAppConfig(page,row,'',manifest));
};
$scope.addNewColumn=function(page,row,column,manifest){
  // get the next available row number
  // call manifestToAppConfig on that page number to the config
  $scope.configTarget=$scope.makeConfigTarget(page,row,column);
  // copy it to the edit object
  // send it to the server
  // replace the appconfig the servers reply (now the server and the page are in sync)
  // it will then take that page object and add it
  console.log($scope.configTarget);
  $scope.creatConfigObject($scope.configTarget,$scope.manifestToAppConfig(page,row,column,manifest));
};
// add new directive NOTE: there is no add column because there is a one to one relationshiop between direstives and columns
$scope.addNewDirective=function(page,row,column,manifest){
  // get the next available column number
  // call manifestToAppConfig on that page number to the config
  $scope.configTarget=$scope.makeConfigTarget(page,row,column,column);
  // copy it to the edit object
  // send it to the server
  // replace the appconfig the servers reply (now the server and the page are in sync)
  // it will then take that page object and add it
  console.log($scope.configTarget);
  $scope.creatConfigObject($scope.configTarget,$scope.manifestToAppConfig(page,row,column,manifest));
  $scope.moveConfigObjectToEdit($scope.configTarget);
};

$scope.addToPage=function(manifest){
  console.log('running add',manifest);
  //if the directive is a layout type
  if(manifest.ai_directive_type === 'layout'){
      if(manifest.ai_directive_name === 'ai_page'){
        $scope.addNewPage($scope.lastPage+1,manifest);
      }else if(manifest.ai_directive_name === 'ai_row'){
          $scope.addNewRow($scope.lastPage,$scope.lastRow+1,manifest);
      }else if(manifest.ai_directive_name === 'ai_col'){
        $scope.addNewColumn($scope.lastPage,$scope.lastRow,$scope.lastColumn+1,manifest);
      }
  }else{
      $scope.addNewColumn($scope.lastPage,$scope.lastRow,$scope.lastColumn+1,$scope.ai_column_manifest);
      $timeout(function(){
        $scope.addNewDirective($scope.lastPage,$scope.lastRow,$scope.lastColumn,manifest);
      },1000);
  }
  $scope.DSopen=false;
  $scope.cplopen=true;
};

$scope.project=project; //init the $scope.project for resolve of project in state machine
$timeout(function(){
    if($scope.project.config[0] === undefined){
      //console.log('setting up');
        $scope.appConfig={
            project_name : 'ourfirst app',
            pages:{}
        };
    }else{
        $scope.appConfig={};
        angular.copy($scope.project.config[0],$scope.appConfig);
    }
},100);

// this watch block renders a the dom when the appconfig changes
$scope.$watch('appConfig',function(){
  angular.element(workarea).empty();
  $scope.renderRowHtmlFromAiConfig($scope.appConfig, '');
  $timeout(function(){
    $scope.renderColHtmlFromAiConfig($scope.appConfig, '');
  },200);
  $timeout(function(){
      $scope.renderDirectiveHtmlFromAiConfig($scope.appConfig, '');
      $scope.getLastColumn();
      $scope.renderClearfixHtmlFromAiConfig($scope.appConfig, '');

    
  },500);
},true);

$scope.getEditCandidate=function(id){
    if(id === $scope.editCandidate){
      return 'edit_row_active'
    }else{
      return  'edit_row_passive';
    }
}

$scope.setEditCandidate=function(id){
    $scope.editCandidate = id      
}

$scope.findDirectiveToMakeActiveEdit=function(obj,idToMatch) {
      if (obj.hasOwnProperty('ai_directive')) {
        if((obj.ai_directive_type ==='layout')){
                  var rowidstring='p_'+obj['ai_directive_page']+'_ai_page';
                  var rowidstring='p_'+obj['ai_directive_page']+'_r_'+obj['ai_directive_row']+'_ai_row';
                  var colidstring='p_'+obj['ai_directive_page']+'_r_'+obj['ai_directive_row']+'_c_'+obj['ai_directive_col']+'_ai_col';
                if((idToMatch == rowidstring) || (idToMatch == colidstring)){
                      $scope.referenceToEditInAppConfig=obj;
                      angular.copy(obj,$scope.appConfigEditCopy); 
                      return 
                }
        }
      }
      for (var property in obj) {
                if(typeof obj[property] == "object"){
                    $scope.findDirectiveToMakeActiveEdit(obj[property],idToMatch);
                }
      }
};

$scope.setEditSelect=function(id){
    // THE DIRECTIVE THAT IS IN THE EDIT CANDIDATE COLUMN
    $scope.cplopen=true;
    $scope.findDirectiveToMakeActiveEdit($scope.appConfig,$scope.editCandidate);
}

});

