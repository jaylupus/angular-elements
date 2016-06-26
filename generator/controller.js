app.controller('ProjectRenderCtrl', function($scope, $compile, $timeout, project, $location, $anchorScroll) {
  // TEST THE FOLLOWING FUNCTIONS
  // add a page
  // add a row
  // add a column
  // add a directive

  // this is the app config
  $scope.allManifests = {};
  $scope.appConfigMaster = {}; // this the version that is in sync with the database 0th position
  $scope.appConfigLayoutEditCopy = {}
  $scope.appConfigEditCopy = {}; // this is the copy of of object being edited that copied to appConfigViewDriver when;
  $scope.appConfigViewDriver = {}; // this is the copy of of object being edited that copied to appConfigViewDriver when
  $scope.referenceToEditInAppConfig = {};
  $scope.activeEdit = {};
  $scope.CurrentViewWidth = '0';
  $scope.containermode = 'container';
  $scope.project_info_sources = [{ "id": "5765c87f0c9b38eff0f8dcb7", "description": "this is an info" }, { "id": "0930ej2n32dj023dn23d02n3d", "description": "this is also an info" }];
  $scope.availableColumnWidths = [{ 'width': '1' }, { 'width': '2' }, { 'width': '3' }, { 'width': '4' }, { 'width': '5' }, { 'width': '6' }, { 'width': '7' }, { 'width': '8' }, { 'width': '9' }, { 'width': '10' }, { 'width': '11' }, { 'width': '12' }];
  $scope.availableColumnShow = [{ 'show': 'true' }, { 'show': 'false' }];
  $scope.builtInManifests = [];
  $scope.lastPage = '0';
  $scope.lastRow = '0';
  $scope.lastColumn = '0';
  $scope.levelsOfUndo = 5;

  // this object gets

  $scope.ai_page_manifest = {
    ai_directive: true,
    ai_directive_type: 'layout',
    ai_directive_name: 'ai_page',
    ai_directive_attributes: {
      ai_class: '/css/row_a/style.css',
      ai_page_title: '',
      ai_page_menu_text: ''
    }
  };

  $scope.ai_row_manifest = {
    ai_directive: true,
    ai_directive_type: 'layout',
    ai_directive_name: 'ai_row',
    ai_directive_attributes: {
      ai_class: '/css/row_a/style.css',
      'class': '',
      'style': '',
      'ai_bootstrap_show': { 'xs': { 'colsize': 'xs', 'show': 'true', 'devicename': 'phone' }, 'sm': { 'colsize': 'sm', 'show': 'true', 'devicename': 'tablet' }, 'md': { 'colsize': 'md', 'show': 'true', 'devicename': 'laptop' }, 'lg': { 'colsize': 'lg', 'show': 'true', 'devicename': 'desktop' } }
    }
  };

  $scope.ai_column_manifest = {
    ai_directive: true,
    ai_directive_type: 'layout',
    ai_directive_name: 'ai_col',
    ai_directive_attributes: {
      ai_class: '/css/row_a/style.css',
      class: '',
      style: '',
      'ai_bootstrap_show': { 'xs': { 'colsize': 'xs', 'show': 'true', 'devicename': 'phone' }, 'sm': { 'colsize': 'sm', 'show': 'true', 'devicename': 'tablet' }, 'md': { 'colsize': 'md', 'show': 'true', 'devicename': 'laptop' }, 'lg': { 'colsize': 'lg', 'show': 'true', 'devicename': 'desktop' } },
      'ai_bootstrap_width': { 'xs': { 'colsize': 'xs', 'devicename': 'phone', 'size': '12' }, 'sm': { 'colsize': 'sm', 'devicename': 'tablet', 'size': '12' }, 'md': { 'colsize': 'md', 'devicename': 'laptop', 'size': '6' }, 'lg': { 'colsize': 'lg', 'devicename': 'desktop', 'size': '6' } }

    },
    ai_content: {}
  };

  $scope.builtInManifests[0] = $scope.ai_page_manifest;
  $scope.builtInManifests[1] = $scope.ai_row_manifest;

  // this function takes your manifest object and add the ai-page,ai-row and ai-col attributes makeing is suitable for insertion into the appConfig
  $scope.manifestToAppConfig = function(page, row, column, manifestObj) {
    //console.log(page);
    if (column > 0) {
      manifestObj.ai_directive_page = page;
      manifestObj.ai_directive_row = row;
      manifestObj.ai_directive_col = column;
      return manifestObj;
    } else if (row > 0) {
      manifestObj.ai_directive_page = page;
      manifestObj.ai_directive_row = row;
      manifestObj.ai_directive_col = '';
      return manifestObj;
    } else if (page > 0) {
      //console.log(manifestObj);
      manifestObj.ai_directive_page = page;
      manifestObj.ai_directive_row = '';
      manifestObj.ai_directive_col = '';
      return manifestObj;
    }
  };

  // This function renders the string of attributes to include in the directive being rendered
  $scope.renderattributeString = function(obj) {
    var attributeString = '';
    var ngClassString = ' ng-class="{';
    for (var attribName in obj) {
      if (attribName.indexOf('ai_bootstrap_width') > -1) {
        for (var bootSize in obj[attribName]) {
          ngClassString += "'col-" + bootSize + "-" + obj[attribName][bootSize]['size'] + "\': true,";
        }
      } else if (attribName.indexOf('ai_bootstrap_show') > -1) {
        for (var bootShow in obj[attribName]) {
          if (obj[attribName][bootShow]['show'] == 'false') {
            ngClassString += "'hidden-" + bootShow + "' : true,";
          }
        }
      } else {
        attributeString += attribName + '="' + obj[attribName] + '" ';
      }
    }
    ngClassString += "'edit_row_passive' : true,";
    attributeString += ngClassString;
    return attributeString;
  };



  // this function append a compiled page into the DOM
  $scope.renderPageHtmlFromAiConfig = function(obj) {
    if (obj.hasOwnProperty('ai_directive')) {
      if ((obj.ai_directive_type === 'layout') && (obj['ai_directive_name'] === 'ai_page')) {
        angular.element(workarea).append($compile('<' + obj['ai_directive_name'] + ' id="p_' + obj['ai_directive_page'] + '_r_' + obj['ai_directive_row'] + '_ai_row" ' + $scope.renderattributeString(obj['ai_directive_attributes']) + '></' + obj['ai_directive_name'] + '>')($scope));
      }
    }
    for (var property in obj) {
      if (typeof obj[property] == "object") {
        $scope.renderPageHtmlFromAiConfig(obj[property]);
      }
    }
  };

  // this function append a compiled row into the DOM
  $scope.renderRowHtmlFromAiConfig = function(obj) {
    if (obj.hasOwnProperty('ai_directive')) {
      if ((obj.ai_directive_type === 'layout') && (obj['ai_directive_name'] === 'ai_row')) {
        angular.element(workarea).append($compile('<div   ' + $scope.renderattributeString(obj['ai_directive_attributes']) + '\'edit_row_active\':getEditCandidate(\'p_' + obj['ai_directive_page'] + '_r_' + obj['ai_directive_row'] + '_ai_row\')}"  ><div class="container" id="p_' + obj['ai_directive_page'] + '_r_' + obj['ai_directive_row'] + '_ai_row"></div></div>')($scope));
        //angular.element(workarea).append($compile('<div style="padding:0px" ng-mouseenter="setEditCandidate(\'p_'+obj['ai_directive_page']+'_r_'+obj['ai_directive_row']+'_ai_row\')" ng-mouseleave="setEditCandidate(\'\')"><ai-edit-hot-spot set-active-edit-element="setEditSelect()" active-edit-element="editCandidate" ai-edit-hot-spot-id="p_'+obj['ai_directive_page']+'_r_'+obj['ai_directive_row']+'_ai_row"></ai-edit-hot-spot>    <div  id="p_'+obj['ai_directive_page']+'_r_'+obj['ai_directive_row']+'_ai_row" '+ $scope.renderattributeString(obj['ai_directive_attributes'])+'\'edit_row_active\':getEditCandidate(\'p_'+obj['ai_directive_page']+'_r_'+obj['ai_directive_row']+'_ai_row\')}"</div></div>')($scope));
      }
    }
    for (var property in obj) {
      if (typeof obj[property] == "object") {
        $scope.renderRowHtmlFromAiConfig(obj[property]);
      }
    }

  };

  // this function append a compiled Column into the DOM
  $scope.renderColHtmlFromAiConfig = function(obj) {
    if (obj.hasOwnProperty('ai_directive')) {
      if ((obj['ai_directive_type'] === 'layout') && (obj['ai_directive_name'] === 'ai_col')) {
        $scope.appendTarget = '#p_' + obj['ai_directive_page'] + '_r_' + obj['ai_directive_row'] + '_ai_row';
        angular.element(document.querySelector($scope.appendTarget)).append($compile('<div id="p_' + obj['ai_directive_page'] + '_r_' + obj['ai_directive_row'] + '_c_' + obj['ai_directive_col'] + '_ai_col" ' + $scope.renderattributeString(obj['ai_directive_attributes']) + '\'edit_row_active\':getEditCandidate(\'p_' + obj['ai_directive_page'] + '_r_' + obj['ai_directive_row'] + '_c_' + obj['ai_directive_col'] + '_ai_col\')}" ng-mouseenter="setEditCandidate(\'p_' + obj['ai_directive_page'] + '_r_' + obj['ai_directive_row'] + '_c_' + obj['ai_directive_col'] + '_ai_col\')" ng-mouseleave="setEditCandidate(\'p_' + obj['ai_directive_page'] + '_r_' + obj['ai_directive_row'] + '_ai_row\')"><ai-edit-hot-spot set-active-edit-element="setEditSelect()" active-edit-element="editCandidate" edit-object-type="column" ai-edit-hot-spot-id="p_' + obj['ai_directive_page'] + '_r_' + obj['ai_directive_row'] + '_c_' + obj['ai_directive_col'] + '_ai_col"></ai-edit-hot-spot></div>')($scope));
      }
    }
    for (var property in obj) {
      if (typeof obj[property] == "object") {
        $scope.renderColHtmlFromAiConfig(obj[property]);
      }
    }
  };

  $scope.renderClearfixHtmlFromAiConfig = function(obj) {
    if (obj.hasOwnProperty('ai_directive')) {
      if ((obj['ai_directive_type'] === 'layout') && (obj['ai_directive_name'] === 'ai_row')) {
        $scope.appendTarget = '#p_' + obj['ai_directive_page'] + '_r_' + obj['ai_directive_row'] + '_ai_row';
        angular.element(document.querySelector($scope.appendTarget)).append($compile('<div class="clearfix"></div>')($scope));
      }
    }
    for (var property in obj) {
      if (typeof obj[property] == "object") {
        $scope.renderClearfixHtmlFromAiConfig(obj[property]);
      }
    }
  };
  // this function append a compiled Directive into the DOM
  // just a note : I dont like the fact that I am using the directives Idea of where it is to render it I would rather use the
  // position of the last column i saw while iterating.
  $scope.renderDirectiveHtmlFromAiConfig = function(obj) {
    if (obj.hasOwnProperty('ai_directive')) {
      if (obj['ai_directive_type'] === 'content') {
        $scope.appendTarget = '#p_' + obj['ai_directive_page'] + '_r_' + obj['ai_directive_row'] + '_c_' + obj['ai_directive_col'] + '_ai_col';
        angular.element(document.querySelector($scope.appendTarget)).append($compile('<div style="margin:0px;padding:0px" class="directiveLandingZone"><' + obj['ai_directive_name'] + ' id="p_' + obj['ai_directive_page'] + '_r_' + obj['ai_directive_row'] + '_c_' + obj['ai_directive_col'] + '" ' + $scope.renderattributeString(obj['ai_directive_attributes']) + '\'directiveSpace\': true}"></' + obj['ai_directive_name'] + '></div>')($scope));
      }
    }
    for (var property in obj) {
      if (typeof obj[property] == "object") {
        $scope.renderDirectiveHtmlFromAiConfig(obj[property]);
      }
    }
  };


  $scope.project = project; //init the $scope.project for resolve of project in state machine
  $timeout(function() {
    if ($scope.project === undefined) {
      //console.log('setting up');
      $scope.appConfig = {
        project_name: 'ourfirst app',
        pages: {}
      };
    } else {
      $scope.appConfig = {};
      angular.copy($scope.project, $scope.appConfig);
    }
  }, 100);
  // this watch block renders a the dom when the appconfig changes
  $scope.$watch('appConfig', function() {
    angular.element(workarea).empty();
    $scope.renderRowHtmlFromAiConfig($scope.appConfig, '');
    $timeout(function() {
      $scope.renderColHtmlFromAiConfig($scope.appConfig, '');
    }, 200);
    $timeout(function() {
      $scope.renderDirectiveHtmlFromAiConfig($scope.appConfig, '');
      $scope.renderClearfixHtmlFromAiConfig($scope.appConfig, '');

      console.dir($scope.appConfig)
    }, 500);
  }, true);

});