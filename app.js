
var app = angular.module('crudApp',['ngResource']);

app.controller('crudController', ['$scope', '$http','$resource','serviceID',function($scope, $http, $resource, serviceID) {

  $scope.initState = function () {
      $scope.student = {};
      $scope.student.addType = 'Add';
      $scope.student.addBtn = true;
      $scope.student.updateBtn = false;
  }

  serviceID.square(2);
  var updateData = function () {
    serviceID.getData(function(hello){
        $scope.student = hello.data;
    });
  }

  serviceID.postData(updateData);

  $scope.removeObject = function (id, updateData) {
    console.log(id);
    serviceID.remove(id)
  }


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


this.postData = function (updateData) {
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
      updateData();
    }, function failureCallback (error) {
        console.log(error);
    })
  }

this.remove = function (ObjectId, updateData) {
  $http({
    method: 'DELETE',
    url: 'http://localhost:3300/api/:id',
    headers: {
      'Content-type': 'application/json'
    },
    data: {
      id: ObjectId
    }
    
  }).then (function successCallback (httpResponse) {
    updateData()
  }, function failureCallback (failureCallback) {
     console.log(failureCallback);
  })
}

}]);

