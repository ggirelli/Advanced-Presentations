// ANGULAR APP \\

angular.module('slider', ['ngAnimate'])

	.controller('sliderController',
		function($scope, $window, $timeout) {

			$scope.currentIndex = -1;
			$scope.currentImage = '';
			$scope.previousImage = '';
			$scope.transitionTime = 0;

			$scope.defaultBgColor = 'black';

			$scope.faded = false;
			$scope.changing = false;

			var parentScope = $window.opener.angular.element('#app_wrap').scope();

			parentScope.$on('CHANGE_SLIDE', function (event, data) {
				$scope.defaultBgColor = 'black';
				$scope.transitionTime = data['time']/1000;

				$scope.previousImage = $scope.currentImage;
				$scope.changing = true;
				$scope.faded = true;
				$scope.$apply();

				$timeout(function () {
					$scope.changing = false;
					$scope.faded = false;
					$scope.$apply();
				}, 500)

				$scope.currentIndex = data['index'];
				$scope.currentImage = data['image'];
				$scope.$apply();
			});

			parentScope.$on('FADE_COLOR', function (event, data) {
				$scope.defaultBgColor = data['color'];
				$scope.faded = true;

				$scope.previousImage = $scope.currentImage;
				$scope.changing = true;
				$scope.$apply();
				$scope.changing = false;
				$scope.$apply();

				$scope.transitionTime = data['time']/1000;
				$scope.$apply();

				$timeout(function () {
					$scope.currentIndex = -1;
					$scope.currentImage = '';
				}, 500)
			});

		}
	);