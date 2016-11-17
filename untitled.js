
var app = angular.module('crudApp',['ngResource']);

app.controller('crudController', ['$scope', '$http','$resource','serviceID',function($scope, $http, $resource, serviceID) {

  $scope.initState = function () {
      $scope.student = {};
      $scope.student.addType = 'Add';
      $scope.student.addBtn = true;
      $scope.student.updateBtn = false;
  }



  $scope.objects = function () {
    serviceID.getData(function(hello){
        $scope.student = hello.data;
    });
  }

  $scope.postData = function () {
    serviceID.postData(function(data){
        serviceID.getData(function(hello){
           $scope.student = hello.data;
        });
    });
  } 

  function updateData () {
    $scope.objects();
  }

  $scope.postData(updateData);

  $scope.removeObject = function (id, updateData) {
    serviceID.remove(id, function(){

     serviceID.getData(function(hello){
           $scope.student = hello.data;
        });


    });
  }

  $scope.objects();

}]);

/* End Controller */
app.directive('preventDefault', function () {
    return {
      link: function (scope, elem) {
        elem.on('click', function (event){
          event.preventDefault();
        })
      }
    }
});

app.service('serviceID', ['$http', function ($http) {

this.getData = function (callback) {
  $http({
    method: 'GET',
    url: 'http://localhost:3300/api'
  }).then(function successCallback (response) {
    callback(response);
  }, 
    function errorCallback (error) {
      console.log(error);
    }
  );
}

this.postData = function (call) {
  $http({
    method: 'POST', 
    url: 'http://localhost:3300/api',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      firstname: 'Ahmad',
      lastname: 'Sharif'
    }

    }).then(function successCallback(response) {
      call(response);
        console.log('Success Add');
    }, function failureCallback (error) {
        console.log(error);

    })
  }

this.remove = function (ID, call) {
  $http({
    method: 'DELETE',
    url: 'http://localhost:3300/api/'+ ID,
    headers: {
      'Content-type': 'application/json'
    },
    data: {
      id: ID
    }
    
  }).then (function successCallback (response) {
      console.log('Success Remove');
      call();

  }, function failureCallback (failureCallback) {
     console.log(failureCallback);
  })
}

}]);

