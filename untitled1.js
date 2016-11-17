
var app = angular.module('crudApp',['ngResource']);

app.controller('crudController', ['$scope', '$http','$resource','serviceID',function($scope, $http, $resource, serviceID) {

  $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";



  $scope.initState = function () {
      $scope.student = {};
      $scope.student.addType = 'Add';
      $scope.student.addBtn = true;
      $scope.student.updateBtn = false;
  }

  serviceID.square(2);
  serviceID.getData(function(hello){
      $scope.student = hello.data;
  });

  serviceID.postData;


}])

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
  this.square = function (x) {
    return x * x;
  }

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


  this.postData = $http({
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
    
  }, function failureCallback (error) {
      console.log(error);
  })

}]);


