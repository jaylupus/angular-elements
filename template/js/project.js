'use strict';

window.app = angular.module('AngularInceptionApp', []);

app.controller('ProjectCtrl', function($scope, $compile, $timeout, project, manifestFactory) {

  // TEST THE FOLLOWING FUNCTIONS
  // add a page
  // add a row 
  // add a column 
  // add a directive
  $scope.appConfig = {}; //init the appconfig
  // this is the app config 
  $scope.appConfigMaster = {}; // this the version that is in sync with the database 0th position
  $scope.appConfigEditCopy = {}; // this is the copy of of object being edited that copied to appConfigViewDriver when;
  $scope.appConfigViewDriver = {}; // this is the copy of of object being edited that copied to appConfigViewDriver when
  $scope.referenceToEditInAppConfig = {};
  $scope.allManifests = manifestFactory;
  $scope.builtInManifests = [];
  $scope.lastPage = '0';
  $scope.lastRow = '0';
  $scope.lastColumn = '0';
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
      class: 'row',
    }
  };
  $scope.ai_column_manifest = {
    ai_directive: true,
    ai_directive_type: 'layout',
    ai_directive_name: 'ai_col',
    ai_directive_attributes: {
      ai_class: '/css/row_a/style.css',
      class: 'col-md-6'
    },
    ai_content: {}
  };

  $scope.builtInManifests[0] = $scope.ai_page_manifest;
  $scope.builtInManifests[1] = $scope.ai_row_manifest;

  // this function get the last page numb in config 
  $scope.getLastPage = function() {
    try {
      $scope.lastPage = 0;
      for (var key in $scope.appConfig.pages) {
        $scope.lastPage++;
      }
    } catch (e) {}
  };
  // this function get the last row numb in config 
  $scope.getLastRow = function() {
    try {
      $scope.getLastPage();
      $scope.lastRow = 0;
      for (var key in $scope.appConfig.pages['page_' + $scope.lastPage].rows) {
        $scope.lastRow++;
      }
    } catch (e) {}
  };
  // this function get the last col numb in config 
  $scope.getLastColumn = function() {
    $scope.getLastRow();
    $scope.lastColumn = 0;
    console.log($scope.appConfig.pages['page_' + $scope.lastPage].rows['row_' + $scope.lastRow]);
    for (var key in $scope.appConfig.pages['page_' + $scope.lastPage].rows['row_' + $scope.lastRow]['cols']) {
      $scope.lastColumn++;
      console.log(key);
    }
  };

  // this function takes your manifest object and add the ai-page,ai-row and ai-col attributes makeing is suitable for insertion into the appConfig
  $scope.manifestToAppConfig = function(page, row, column, manifestObj) {
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
      manifestObj.ai_directive_page = page;
      manifestObj.ai_directive_row = '';
      manifestObj.ai_directive_col = '';
      return manifestObj;
    }
  };

  // This function renders the string of attributes to include in the directive being rendered
  $scope.renderattributeString = function(obj) {
    var attributeString = '';
    for (var keys in obj) {
      attributeString += keys + '="' + obj[keys] + '" ';
    }
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
        angular.element(workarea).append($compile('<' + obj['ai_directive_name'] + ' id="p_' + obj['ai_directive_page'] + '_r_' + obj['ai_directive_row'] + '_ai_row" ' + $scope.renderattributeString(obj['ai_directive_attributes']) + '></' + obj['ai_directive_name'] + '>')($scope));
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
        // console.log(obj);
        angular.element(document.querySelector($scope.appendTarget)).append($compile('<' + obj['ai_directive_name'] + ' id="p_' + obj['ai_directive_page'] + '_r_' + obj['ai_directive_row'] + '_c_' + obj['ai_directive_col'] + '_ai_col" ' + $scope.renderattributeString(obj['ai_directive_attributes']) + '></' + obj['ai_directive_name'] + '>')($scope));
      }
    }
    for (var property in obj) {
      if (typeof obj[property] == "object") {
        $scope.renderColHtmlFromAiConfig(obj[property]);
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
        angular.element(document.querySelector($scope.appendTarget)).append($compile('<' + obj['ai_directive_name'] + ' id="p_' + obj['ai_directive_page'] + '_r_' + obj['ai_directive_row'] + '_c_' + obj['ai_directive_col'] + '" ' + $scope.renderattributeString(obj['ai_directive_attributes']) + '></' + obj['ai_directive_name'] + '>')($scope));
      }
    }
    for (var property in obj) {
      if (typeof obj[property] == "object") {
        $scope.renderDirectiveHtmlFromAiConfig(obj[property]);
      }
    }
  };

  // this function adds a new element to the config obj
  $scope.creatConfigObject = function(target, obj) {
    //target=obj;
    angular.copy(obj, target);
  };
  // this read a appConfig object
  $scope.readConfigObject = function(target, newelement) {};
  // this function updates a appconfig object
  $scope.updateConfigObject = function(target, newelement, obj) {
    target[newelement] = obj;
  };
  // this function deletes a object from the appConfig object
  $scope.deleteconfigObject = function(target, subElement) {
    delete target[subElement];
  };
  // this functon get the next row number to assgin for the current page
  $scope.getNextRowPage = function(page) {
    var newRow;
    return newRow;
  };
  // this functon get the next row and column number to assgin for the current page
  $scope.getNextColumnInRow = function(page, row) {
    var newCol;
    return newCol;
  };

  // this function will return a reference to the needed config tagget
  $scope.makeConfigTarget = function(page, row, column, landDirective) {
    if (landDirective) {
      if ($scope.appConfig.pages['page_' + page]['rows']['row_' + row]['cols'].hasOwnProperty('col_' + column)) {
        return $scope.appConfig.pages['page_' + page]['rows']['row_' + row]['cols']['col_' + column]['ai_content'] = {};
      }
    } else if (column) {
      if (!$scope.appConfig.pages['page_' + page]['rows']['row_' + row].hasOwnProperty('cols')) { $scope.appConfig.pages['page_' + page]['rows']['row_' + row]['cols'] = {} };
      return $scope.appConfig.pages['page_' + page]['rows']['row_' + row]['cols']['col_' + column] = {};
    } else if (row) {
      if (!$scope.appConfig.pages['page_' + page].hasOwnProperty('rows')) { $scope.appConfig.pages['page_' + page]['rows'] = {} };
      return $scope.appConfig.pages['page_' + page]['rows']['row_' + row] = {};
    } else if (page) {
      if (!$scope.appConfig.pages.hasOwnProperty('pages')) { $scope.appConfig.pages = {}; }
      return $scope.appConfig.pages['page_' + page] = {};
    }
  };

  $scope.project = project; //init the $scope.project for resolve of project in state machine
  $timeout(function() {
    if ($scope.project.config[0] === undefined) {
      $scope.appConfig = {
        project_name: 'ourfirst app',
        pages: {}
      };
    } else {
      $scope.appConfig = {};
      angular.copy($scope.project.config[0], $scope.appConfig);
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
      $scope.getLastColumn();
      console.log($scope.lastPage + ':' + $scope.lastRow + ':' + $scope.lastColumn);

    }, 500);
    console.dir($scope.appConfig);
  }, true);

});

app.factory('manifestFactory', function() {
  return [{
    ai_directive: true,
    ai_directive_type: 'content',
    ai_directive_name: 'solo_table',
    ai_directive_attributes: {
      solo_table_title: 'title',
      solo_table_class: 'myclass',
      solo_table_info_source: 'myclass',
      solo_table_info_type: 'file'
    }
  }, {
    ai_directive: true,
    ai_directive_type: 'content',
    ai_directive_name: 'solo_table',
    ai_directive_attributes: {
      solo_table_title: 'title',
      solo_table_class: 'myclass',
      solo_table_info_source: 'myclass',
      solo_table_info_type: 'file'
    }
  }, {
    ai_directive: true,
    ai_directive_type: 'content',
    ai_directive_name: 'solo_table',
    ai_directive_attributes: {
      solo_table_title: 'title',
      solo_table_class: 'myclass',
      solo_table_info_source: 'myclass',
      solo_table_info_type: 'file'
    }
  }]
});

app.directive('aiPage', function() {
  return {
    transclude: true,
    restrict: 'EA',
    scope: {
      aiClass: '/css/row_a/style.css',
      aiPageTitle: '',
      aiPageMenuText: ''
    },
    template: ''
  };
});
app.directive('aiRow', function() {
  return {
    transclude: true,
    restrict: 'EA',
    scope: {
      inceptRowOrder: '@',
      inceptRowBgColor: '@',
      inceptRowBgImage: '@',
    },
    template: ''
  };
});

app.directive('aiCol', function() {
  return {
    transclude: true,
    restrict: 'E',
    scope: {
      inceptionColId: '@',
      inceptionColWidth: '@',
      inceptionRowId: '@',
      inceptionColOrderInRow: '@'
    },
    template: ''
  };
});
app.directive('directiveShopCard', function() {
  return {
    restrict: "EA",
    scope: {
      manifest: '='
    },
    templateUrl: 'directiveStore/directiveStoreCard/card.html',
  };
});