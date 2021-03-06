app.directive('aiClickImg', function() {
  return {
    restrict: 'EA',
    scope: {
      aiHeight: '@',
      aiWidth: '@',
      aiLink: '@',
      aiImgUrl: '@',
      bordertype:'@',
      bordercolor:'@',
      borderweight:'@',
      caption:'@'
    },
    templateUrl: 'directiveStore/ai_click_img/ai_click_img.html',
    link: function(scope, elem, attr) {

      let width = attr.aiWidth;
      let height = attr.aiHeight;
      let href = attr.aiLink;
      let imgUrl = attr.aiImgUrl;
      let bordertype=attr.bordertype;
      let bordercolor=attr.bordercolor;
      let borderweight=attr.borderweight;
      let caption=attr.caption;

      scope.image = {
        "params": null
      };

      scope.image.params = {
        "height": height,
        "width": width,
        "src": imgUrl,
        "href": href,
        "caption":caption
      };


      if(bordertype && borderweight && bordercolor){
        scope.image.params["border"]="border: "+bordertype+" "+bordercolor+" "+borderweight;
      }

    },
  }
});