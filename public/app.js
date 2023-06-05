
// AngularJS code and API calls
angular.module("myApp", []).controller("MainController", [
  "$scope",
  "$http",
  function ($scope, $http) {
    $scope.activeTab = 1;
    $scope.user = {};
    $scope.userList = [];

    $scope.changeTab = function (tab) {
      $scope.activeTab = tab;
      if (tab === 3) {
        $scope.getUserList();
      }
    };
    function generateUniqueId() {
        return Date.now().toString();
      }

    $scope.createUser = function () {
      var formData = new FormData();
      formData.append('id', generateUniqueId()); // Generate a unique ID
      formData.append("firstName", $scope.user.firstName);
      formData.append("lastName", $scope.user.lastName);
      formData.append("email", $scope.user.email);
      formData.append("phoneNumber", $scope.user.phoneNumber);
      formData.append("profileImage", $scope.user.profileImage);
      console.log(formData);
      $http
        .post("/api/users", formData, {
          transformRequest: angular.identity,
          headers: { "Content-Type": undefined },
        })
        .then(function (response) {
          // Handle success
          console.log(formData);
        })
        .catch(function (error) {
          // Handle error
          console.log(error);
        });
    };

    $scope.updateUser = function () {
      var formData = new FormData();
      formData.append('id', $scope.user.id);
      formData.append("firstName", $scope.user.firstName);
      formData.append("lastName", $scope.user.lastName);
      formData.append("email", $scope.user.email);
      formData.append("phoneNumber", $scope.user.phoneNumber);
      if ($scope.user.profileImage) {
        formData.append("profileImage", $scope.user.profileImage);
      }
      console.log($scope.user)

      $http
        .put("/api/user/" + $scope.user.email, formData, {
          transformRequest: angular.identity,
          headers: { "Content-Type": undefined },
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error)
        });
    };

    $scope.getUserList = function () {
      $http
        .get("/api/userlist")
        .then(function (response) {
          $scope.userList = response.data;
        })
        .catch(function (error) {
          console.log(error);

        });
    };
    $scope.deleteUser = function() {
        var userId = $scope.userIdToDelete;
      
        $http.delete('/api/users/' + userId)
          .then(function(response) {
            console.log(response)
          })
          .catch(function(error) {
            console.log(error);
          });
      };
      $scope.findUser = function() {
        var userId = $scope.userIdToFind;
      
        $http.get('/api/users/' + userId)
          .then(function(response) {
            $scope.userDetails = response.data[0];
          })
          .catch(function(error) {
            console.log(error);
          });
      };
  },
])
.directive('fileModel', ['$parse', function($parse) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function() {
          scope.$apply(function() {
            modelSetter(scope, element[0].files[0]);
          });
        });
      }
    };
  }]);
