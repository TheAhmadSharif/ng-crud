
var app = angular.module('crudApp',['ngResource']);
app.controller('crudController', ['$scope', '$http', 'crudFactory', 'UniqueCodeService', 'services',function($scope, $http, crudFactory, UniqueCodeService, services) {
	$scope.student = {
		"firstname": "Ahmad",
		"lastname": "Sharif",
	}

    $scope.names = ["Emil", "Tobias", "Linus"];

    $scope.addData = function () {

    	var flag = {
        'status': true,
        'errorMsg': 'Please enter valid information.<br>'
      }


    	var postData = {
    		first_name: $scope.student.firstname,
    		last_name: $scope.student.lastname,
    	}

    	crudFactory.post(postData).$promise.then(function(data) {
        $scope.get();
        console.log("Save Succesfully");
      }, function(error) {
        console.log("Save not done,please try again");
      });

    }

    services.ahmad();

   

}]);


app.directive('preventDefault', [function(){
	return {
		restrict: 'ACE',
		link: function(scope, element, attrs) {
				 element.on('click', function(e){
				 	console.log('Clicked');
                    e.preventDefault();
                    e.stopPropagation()

                });
		}
	}
}]);

app.factory('crudFactory', function($resource) {


        return $resource('http://localhost:3300/api/:id', {
                id: '@id'
        }, {
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

app.factory('UniqueCodeService', function ($resource) {
    //Create new record
    return $resource('http://localhost:3300/api/check/:id', {
                id: '@firstname'
        }, {
                get: {
                        method: 'GET',
                        isArray: true
                }
        });

});

app.service('services', ['$http', function($http) {
  this.get = function() {
    return $http.get('http://localhost:3300/api');
  };
  this.post = function() {
    return $http.post('http://localhost:3300/api/', 'x');
  }

  this.ahmad = function () {
    console.log('hi');
    return 2;
  }
}]);
