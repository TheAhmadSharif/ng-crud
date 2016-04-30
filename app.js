
var app = angular.module('crudApp',['ngResource']);
app.controller('crudController', ['$scope', '$http','$resource', 'crudFactory', 'UniqueCodeService', 'TestServices',function($scope, $http, $resource, crudFactory, UniqueCodeService, TestServices) {
	$scope.student = {
		"firstname": "Ahmad",
		"lastname": "Sharif",
	}

    $scope.cat = TestServices.get();


    $scope.People = {
      "null": 
      [
        {
          "Name": "Ahmad",
          "Age": "22"
        },

        {
          "Name": "Zahid",
          "Age": "20"
        }
      ]
    }


    $scope.dataset = {
          "glossary": {
              "title": "example glossary",
          "GlossDiv": {
                  "title": "S",
            "GlossList": {
                      "GlossEntry": {
                          "ID": "SGML",
                "SortAs": "SGML",
                "GlossTerm": "Standard Generalized Markup Language",
                "Acronym": "SGML",
                "Abbrev": "ISO 8879:1986",
                "GlossDef": {
                              "para": "A meta-markup language, used to create markup languages such as DocBook.",
                  "GlossSeeAlso": ["GML", "XML"]
                          },
                "GlossSee": "markup"
                      }
                  }
              }
          }
      }

      console.log($scope.dataset.glossary.title);

    $scope.products = [{
      Name: "Soap",
      Price: "25",
      Quantity: "10"
    }, {
      Name: "Bag",
      Price: "100",
      Quantity: "15"
    }, {
      Name: "Pen",
      Price: "15",
      Quantity: "13"
    }];


    this.employeeList = {"employees":[
    {"firstName":"John", "lastName":"Doe"},
    {"firstName":"Anna", "lastName":"Smith"},
    {"firstName":"Peter", "lastName":"Jones"}
]}

     $scope.EditBlock= false; 
     console.log($scope.EditBlock);

    $scope.EditData = function () {
      $scope.EditBlock= true; 
    }

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
            console.log("Save Succesfully");
          }, function(error) {
            console.log("Save not done,please try again");
          });

    }

    $scope.DeleteData = function (abcd) {
      var id = abcd
      console.log(id);
      if (id) {
        console.log(id);
           /*crudFactroy.delete('http://localhost:3300/api/', id, function (){
              console.log('Deleted Succesfully');
          });
          $scope.get();*/
      }
    }




    /* GET DATA FROM DB */

    $scope.get = function get() {
      crudFactory.get('http://localhost:3300/api/',{},function(data){
        $scope.items = data;
        console.log(data);
        console.log('hi');
      });
    };
    $scope.get();
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
