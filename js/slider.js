// ANGULAR APP \\

angular.module('slider', ['ngAnimate'])

	.controller('sliderController',
		function($scope, $window) {

			$scope.currentIndex = -1;
			$scope.currentImage = '';

			var parentScope = $window.opener.angular.element('#app_wrap').scope();
			parentScope.$on('CHANGE_SLIDE', function (event, data) {
				$scope.currentIndex = data['index'];
				$scope.currentImage = data['image'];
				$scope.$apply();
			});

		}
	);