/*global Firebase*/
'use strict';

/**
 * @ngdoc function
 * @name firebaseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the firebaseApp
 */
angular.module('firebaseApp')
  .controller('MainCtrl', function ($scope, $timeout) {
    var rootRef = new Firebase('https://scorching-fire-9399.firebaseio.com/');
    var childRef = rootRef.child('message');

    childRef.on('value', function(snapshot){
    	$timeout(function(){
    		var snapshotVal = snapshot.val();
    		console.log(snapshotVal);
    		$scope.message = snapshotVal;
    	});
    });

    $scope.$watch('message.text', function(newVal) {
    	if (!newVal){
    		return;
    	}
    	childRef.update({
    		text: newVal
    	});
    });

    $scope.setMessage = function(){
    	childRef.set({
    		user: 'Bob',
    		text: 'Hi'
    	});
    };

    $scope.updateMessage = function(){
    	childRef.update({
    		text: 'Bum Bee'
    	});
    };

    $scope.deleteMessage = function(){
    	childRef.remove();
    };

  });
