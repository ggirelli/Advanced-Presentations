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

			$scope.position = {
				top : 0,
				left : 0,
				bottom : 0,
				right : 0
			};
			$scope.zoom = 1;

			var parentScope = $window.opener.angular.element('#app_wrap').scope();

			parentScope.$on('CHANGE_SLIDE', function (event, data) {
				$scope.defaultBgColor = 'black';
				$scope.transitionTime = data['time']/1000;

				$scope.previousImage = $scope.currentImage;
				$scope.changing = true;
				$scope.faded = true;
				$scope.$apply();

				$timeout(function () {
					$scope.position = {
						top : 0,
						left : 0,
						bottom : 0,
						right : 0
					};
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

			parentScope.$on('ZOOM', function (event, data) {
				$scope.zoom = parseFloat(data['zoom']) / 100;
				$scope.transitionTime = data['time']/1000;

				var width = angular.element('body').width();
				var height = angular.element('body').height();

				width = (1 - $scope.zoom) * width;
				height = (1 - $scope.zoom) * height;

				$scope.position.top = height * data.y;
				$scope.position.bottom = height * (1 - data.y);
				$scope.position.left = width * data.x;
				$scope.position.right = width * (1 - data.x);
				$scope.$apply();
			});

		}
	);