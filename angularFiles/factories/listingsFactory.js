app.factory('listingsFactory', ['$http', function($http) {
    var urlBase = 'http://localhost:8080/listings';
    var listingsFactory = {};

    //Return all listings
    listingsFactory.getAllListings = function () {
        return $http.get(urlBase);
    };

    listingsFactory.getListing = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    listingsFactory.insertListing = function (data) {
        return $http.post(urlBase + '/pictures', data);
    };

    listingsFactory.getUserListings = function (data,config) {
        return $http.post(urlBase + '/user', data, config);
    };

    listingsFactory.searchListings = function () {
        return $http.post(urlBase + '/all');
    };

    return listingsFactory;
}]);
