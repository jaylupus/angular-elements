// appends a compiled page into the DOM
var renderPageHtmlFromAiConfig = function(obj) {
  if (obj.hasOwnProperty('ai_directive')) {
    if ((obj.ai_directive_type === 'layout') && (obj.ai_directive_name === 'ai_page')) {
      angular.element(workarea).append($compile('<' + obj.ai_directive_name + ' id="p_' + obj.ai_directive_page + '_r_' + obj.ai_directive_row + '_ai_row" ' + renderattributeString(obj.ai_directive_attributes) + '></' + obj.ai_directive_name + '>')($scope));
    }
  }
  for (var property in obj) {
    if (typeof obj[property] === "object") {
      renderPageHtmlFromAiConfig(obj[property]);
    }
  }
};

// appends a compiled row into the DOM
var renderRowHtmlFromAiConfig = function(obj) {
  if (obj.hasOwnProperty('ai_directive')) {
    if ((obj.ai_directive_type === 'layout') && (obj.ai_directive_name === 'ai_row')) {
      angular.element(workarea).append($compile('<div ' + renderattributeString(obj.ai_directive_attributes) + '\'edit_row_active\':getEditCandidate(\'p_' + obj.ai_directive_page + '_r_' + obj.ai_directive_row + '_ai_row\')}"   ng-mouseenter="setEditCandidate(\'p_' + obj.ai_directive_page + '_r_' + obj.ai_directive_row + '_ai_row\')" ng-mouseleave="setEditCandidate(\'\')"><ai-edit-hot-spot set-active-edit-element="setEditSelect()" " active-edit-element="editCandidate" edit-object-type="row" ai-edit-hot-spot-id="p_' + obj.ai_directive_page + '_r_' + obj.ai_directive_row + '_ai_row"></ai-edit-hot-spot><div class="container" id="p_' + obj.ai_directive_page + '_r_' + obj.ai_directive_row + '_ai_row"></div></div>')($scope));
    }
  }
  for (var property in obj) {
    if (typeof obj[property] === "object") {
      renderRowHtmlFromAiConfig(obj[property]);
    }
  }
};

// appends a compiled Column into the DOM
var renderColHtmlFromAiConfig = function(obj) {
  if (obj.hasOwnProperty('ai_directive')) {
    if ((obj.ai_directive_type === 'layout') && (obj.ai_directive_name === 'ai_col')) {
      var appendTarget = '#p_' + obj.ai_directive_page + '_r_' + obj.ai_directive_row + '_ai_row';
      angular.element(document.querySelector(appendTarget)).append($compile('<div id="p_' + obj.ai_directive_page + '_r_' + obj.ai_directive_row + '_c_' + obj.ai_directive_col + '_ai_col" ' + $scope.renderattributeString(obj.ai_directive_attributes) + '\'edit_row_active\':getEditCandidate(\'p_' + obj.ai_directive_page + '_r_' + obj.ai_directive_row + '_c_' + obj.ai_directive_col + '_ai_col\')}" ng-mouseenter="setEditCandidate(\'p_' + obj.ai_directive_page + '_r_' + obj.ai_directive_row + '_c_' + obj.ai_directive_col + '_ai_col\')" ng-mouseleave="setEditCandidate(\'p_' + obj.ai_directive_page + '_r_' + obj.ai_directive_row + '_ai_row\')"><ai-edit-hot-spot set-active-edit-element="setEditSelect()" active-edit-element="editCandidate" edit-object-type="column" ai-edit-hot-spot-id="p_' + obj.ai_directive_page + '_r_' + obj.ai_directive_row + '_c_' + obj.ai_directive_col + '_ai_col"></ai-edit-hot-spot></div>')($scope));
    }
  }
  for (var property in obj) {
    if (typeof obj[property] === "object") {
      renderColHtmlFromAiConfig(obj[property]);
    }
  }
};

var renderClearfixHtmlFromAiConfig = function(obj) {
  if (obj.hasOwnProperty('ai_directive')) {
    if ((obj.ai_directive_type === 'layout') && (obj.ai_directive_name === 'ai_row')) {
      var appendTarget = '#p_' + obj.ai_directive_page + '_r_' + obj.ai_directive_row + '_ai_row';
      angular.element(document.querySelector(appendTarget)).append($compile('<div class="clearfix"></div>')($scope));
    }
  }
  for (var property in obj) {
    if (typeof obj[property] === "object") {
      renderClearfixHtmlFromAiConfig(obj[property]);
    }
  }
};

// appends a compiled Directive into the DOM
var renderDirectiveHtmlFromAiConfig = function(obj) {
  if (obj.hasOwnProperty('ai_directive')) {
    if (obj.ai_directive_type === 'content') {
      var appendTarget = '#p_' + obj.ai_directive_page + '_r_' + obj.ai_directive_row + '_c_' + obj.ai_directive_col + '_ai_col';
      angular.element(document.querySelector(appendTarget)).append($compile('<div style="margin:0px;padding:10px"><' + obj.ai_directive_name + ' id="p_' + obj.ai_directive_page + '_r_' + obj.ai_directive_row + '_c_' + obj.ai_directive_col + '" ' + $scope.renderattributeString(obj.ai_directive_attributes) + '\'directiveSpace\': true}"></' + obj.ai_directive_name + '></div>')($scope));
    }
  }
  for (var property in obj) {
    if (typeof obj[property] === "object") {
      renderDirectiveHtmlFromAiConfig(obj[property]);
    }
  }
};

var renderPage = function() {
    renderRowHtmlFromAiConfig(appConfig, '');
    $timeout(function() {
      renderColHtmlFromAiConfig(appConfig, '');
    }, 200);
    $timeout(function() {
      renderDirectiveHtmlFromAiConfig(appConfig, '');
      renderClearfixHtmlFromAiConfig(appConfig, '');
    }, 500);
  },
  true);