app.factory('usersFactory', ['$http', function($http) {
    var urlBase = 'http://localhost:8080/users';
    var usersFactory = {};

    //Return all listings
    usersFactory.createUser = function (data, config) {
        return $http.post(urlBase, data, config);
    };

    usersFactory.authorizeUser = function (data, config) {
        return $http.post(urlBase + '/authorize', data, config);
    };

    usersFactory.getUserName = function (data,config) {
        return $http.post(urlBase + '/name', data, config);
    };

    usersFactory.updateUser = function (data,config) {
        return $http.post(urlBase + '/update', data, config);
    };

    usersFactory.facebook = function (data,config) {
        return $http.post(urlBase + '/facebook', data, config);
    };

    usersFactory.updateFB = function (data,config) {
        return $http.post(urlBase + '/updatefb', data, config);
    };

    return usersFactory;
}]);
