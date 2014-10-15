'use strict';

/**
 * @ngdoc function
 * @name doresolDashboardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the doresolDashboardApp
 */
angular.module('doresolDashboardApp')
  .controller('MainCtrl', function ($scope,$firebase) {
  	var FIREBASE_URI = 'https://doresol-beta.firebaseio.com/';

  	var userRef = new Firebase(FIREBASE_URI + '/users');
    var memorialsRef = new Firebase(FIREBASE_URI + '/memorials');
    
    var _users = $firebase(userRef).$asArray();
    var _memorails = $firebase(memorialsRef).$asArray();

    $scope.totalUserCnt = 0;
    $scope.totalMemorialCnt = 0;

    _users.$watch(function(event){
      switch(event.event){
        case "child_removed":
          $scope.totalUserCnt--;
        break;
        case "child_added":
          $scope.totalUserCnt++;
        break;
      }
    });

    _memorails.$watch(function(event){
      switch(event.event){
        case "child_removed":
          $scope.totalMemorialCnt--;
        break;
        case "child_added":
          $scope.totalMemorialCnt++;
        break;
      }
    });
  });
