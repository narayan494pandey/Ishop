var app = angular.module("IShop", ["ngRoute"]);
app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "home.html",
    })
    .when("/products", {
      templateUrl: "products.html",
    })
    .when("/login", {
      templateUrl: "login.html",
      controller: "LoginController",
    })
    .when("/register", {
      templateUrl: "register.html",
      controller: "RegisterController",
    })
    .when("/home", {
      templateUrl: "home.html",
    });
});
app.controller("RegisterController", function ($scope, $http) {
  $scope.SubmitClick = function (user) {
    $http.post("http://127.0.0.1:8081/RegisterUser", {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      City: user.City,
      State: user.State,
      PinCode: user.PinCode,
    });
    location.href = "login.html";
  };
});
app.controller("LoginController", function ($scope, $http) {
  $scope.userDetails = [];
  $http.get("http://127.0.0.1:8081/userDetails").then(function (response) {
    $scope.userDetails = response.data;
  });
  $scope.txtName = "";
  $scope.txtPwd = "";
  $scope.Login = function () {
    for (var i = 0; i < $scope.userDetails.length; i++) {
      if (
        $scope.userDetails[i].UserName === $scope.txtName &&
        $scope.userDetails[i].Password === $scope.txtPwd
      ) {
        console.log($scope.userDetails[i].UserName);
        console.log($scope.txtName);
        location.href = "index.html";
        break;
      } else {
        location.href = "error.html"; 
      }
    }
  };
});
app.controller("HomeController", function ($scope, $http) {
  $scope.products = [];
  $scope.categories = [];
  $http.get("http://127.0.0.1:8081/ProductDetails").then(function (response) {
    $scope.products = response.data;
  });
  $http.get("http://127.0.0.1:8081/CategoryDetails").then(function (response) {
    $scope.categories = response.data;
  });
  $scope.selectedCategory = 0;
  $scope.GetCategory = function (obj) {
    $scope.selectedCategory = obj.categoryId;
  };
  $scope.cartItems = [];
  $scope.AddToCart = function (item) {
    $scope.cartItems.push(item);
    $scope.count = function () {
      var count = 0;
      count = $scope.cartItems.length;

      return count;
    };
    $scope.AddCounter = function (item) {
      item.quantity++;
    };
    $scope.MinusCounter = function (item) {
      item.quantity--;
    };
  };
  $scope.total = function () {
    var total = 0;
    angular.forEach($scope.cartItems, function (product) {
      total += product.quantity * product.Price;
    });

    return total;
  };
  $scope.Delete = function (index) {
    var verify = confirm("Are you sure , want to Delete?");
    if (verify == true) {
      $scope.cartItems.splice(index, 1);
    }
  };
});
app.controller("ScrollController", [
  "$scope",
  "$location",
  "$anchorScroll",
  function ($scope, $location, $anchorScroll) {
    $scope.goToTOP = function () {
      $location.hash("top");
      $anchorScroll();
    };
  },
]);
