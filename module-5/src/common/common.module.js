(function() {
"use strict";

angular.module('common', [])
.constant('API_BASE_PATH', 'https://coderfool.herokuapp.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
