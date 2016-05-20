
var app = angular.module('crudApp',['ngResource']);
app.controller('crudController', ['$scope', '$http','$resource', 'crudFactory',function($scope, $http, $resource, crudFactory) {

	$scope.student = {}

   /* $scope.cat = TestServices.get();*/

     console.log($scope);

    $scope.EditData = function () {
      $scope.EditBlock= true; 
    }

    /* GET DATA FROM DB */
    $scope.get = function get() {
      crudFactory.get('',{},function(data){
        $scope.items = data;
        console.log(data);
      });
    }

    $scope.get();


    $scope.addData = function () {

    	var postData = {
    		first_name: $scope.student.firstname,
    		last_name: $scope.student.lastname,
    	}

        crudFactory.post(postData).$promise.then(function(data) {
           
            console.log("Save Succesfully");

          }, function(error) {
            console.log("Save not done,please try again");
          });

         $scope.get();

    }

  




  $scope.DeleteData = function (id) {
  var id = id;
 
  if (id) {
      crudFactory.delete('http://localhost:3300/api/:id', {id: id }, function (data){
          console.log(data);
            $scope.get();
     });
      
  }
}



}]);



app.directive('preventDefault', [function(){
	return {
		restrict: 'ACE',
		link: function(scope, element, attrs) {
				 element.on('click', function(e){
                    e.preventDefault();
                    e.stopPropagation()

                });
		}
	}
}]);

app.factory('crudFactory', function($resource) {
        return $resource(
          'http://localhost:3300/api/:id', 
          {
                id: '@id'
           },
           {
                post: {
                        method: 'POST'
                },
                update: {
                        method: 'PUT'
                },
                get: {
                        method: 'GET',
                        isArray: true
                },
                delete: {
                        method: 'DELETE'
                }
        });
});// End Factory


app.service('TestServices', ['$http', function($http) {
  this.value = '';  
  this.get = function() {
    return $http.get('http://localhost:3300/api');
  };
  this.post = function() {
    return $http.post('http://localhost:3300/api/', 'x');
  }

  this.ahmad = function (data) {
    this.value = data;
  }

  this.getDAta = function(){
    return this.value;
  }

}]);
