
var app = angular.module('crudApp',['ngResource']);

app.controller('crudController', ['$scope', '$http','$resource','serviceID',function($scope, $http, $resource, serviceID) {

  $scope.initState = function () {
      $scope.student = {};
      $scope.student.addType = 'Add';
      $scope.student.addBtn = true;
      $scope.student.updateBtn = false;
  }
  $scope.initState();

  console.log('From Initial Block', $scope.student);


  $scope.updateCallback = function () {

      $http({
      method: 'PUT',
      url: 'http://localhost:3300/api/582c1e183b12b9289185735f'
      }).then(function successCallback(response) {
         
        }, function errorCallback(response) {
          
        });

      console.log('hii');
  }

  

  $scope.updateCallback();

  $scope.editData = function () {
      $scope.student = {
        'addType': 'Update',
        'addBtn': false,
        'updateBtn': true
      }
  }

  $scope.objects = function () {
    serviceID.getData(function(hello){
        $scope.dataSet = hello.data;
        console.log($scope.dataSet);
    });
  }

  $scope.postData = function () {
    serviceID.postData();
  } 

  function updateData () {
    $scope.objects();
  }

  $scope.postData(updateData);

  $scope.removeObject = function (id) {
    serviceID.remove(id, updateData);
  }

  $scope.objects();



   $scope.curPage = 0;
   $scope.pageSize = 2;
  $scope.numberOfPages = function() {
         return Math.ceil($scope.dataSet.length / $scope.pageSize);
      };


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

var firstName = ['Mr.', 'Ahmad', 'Nafis'];
var lastName = ['Sharif', 'Ahmad', 'Rahman'];

this.postData = function (updateData) {

  var firstName = ['Mr.','Max', 'Mark','Sir'];
  var lastName = ['Thomas', 'Jacob', 'Peter', 'John'];

  var firstName = firstName[Math.floor(firstName.length * Math.random())];
  var lastName = lastName[Math.floor(firstName.length * Math.random())];

  console.log(firstName, lastName);




  $http({
    method: 'POST', 
    url: 'http://localhost:3300/api',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      firstname: firstName,
      lastname: lastName
    }

    }).then(function successCallback(response) {
        console.log('Success Add');
    }, function failureCallback (error) {
        console.log(error);

    })
  }

this.remove = function (ID, updateData) {
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
      updateData();

  }, function failureCallback (failureCallback) {
     console.log(failureCallback);
  })
}

}]);

