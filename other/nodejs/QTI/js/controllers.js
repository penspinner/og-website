var app = angular.module('QTIControllers', []);

app.controller('HomeController', ['$scope', function($scope)
{
    $(function()
    {
        $('.cycle-slideshow').cycle();
        $(".mobile_nav").on('click', function()
        {
            $(".navbar").toggleClass("menu_active");
            $(this).toggleClass("change");
        });
    });
}]);
