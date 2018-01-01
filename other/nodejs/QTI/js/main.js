angular.element(document).ready(function()
{
	var app = angular
		.module("app", ['ui.router', 'QTIControllers'])
		.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
			function($stateProvider, $urlRouterProvider, $locationProvider)
			{
				$urlRouterProvider.otherwise('/');
				$locationProvider.html5Mode(true);
				$stateProvider
					.state('home',
					{
						url: '/',
						templateUrl: 'partials/home.html',
						controller: 'HomeController'
					})
					.state('about',
					{
						url: '/about',
						templateUrl: 'partials/about.html'
					})
					.state('services',
					{
						url: '/services',
						templateUrl: 'partials/services.html'
					})
					.state('clients',
					{
						url: '/clients',
						templateUrl: 'partials/clients.html'
					})
					.state('partners',
					{
						url: '/partners',
						templateUrl: 'partials/partners.html'
					})
					.state('testimonials',
					{
						url: '/testimonials',
						templateUrl: 'partials/testimonials.html'
					});
			}]);

	var body = document.getElementsByTagName("body")[0];
	angular.bootstrap(body, [app.name]);
	
});
