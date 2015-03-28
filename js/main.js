// ANGULAR APP \\

angular.module('advanced-presentations', ['ngAnimate'])

	.controller('interfaceController',
		function($scope, $http, $window) {

			$('[data-toggle="tooltip"]').tooltip()

			/**
			 * Slider open status
			 * @type {Boolean}
			 */
			$scope.opened = false;

			/**
			 * Slide sequence
			 * @type {Array}
			 */
			$scope.imageList = [];
			$scope.indexList = [];

			$scope.currentIndex = -1;

			$scope.transitionTime = 500;

			$scope.xCoord = 0;
			$scope.yCoord = 0;
			$scope.currentZoom = 100;

			/**
			 * Whether the slider is open
			 * @return {Boolean}
			 */
			$scope.isOpen = function () { return($scope.opened); }

			/**
			 * Opens the slider
			 * @return NULL
			 */
			$scope.open = function () {
				$scope.opened = true;
			    $scope.slider = $window.open('slider.html','slider','modal=yes,alwaysRaised=yes,location=0,menubar=0,resizable=0,fullscreen=1');
			};

			/**
			 * Closes the slider
			 * @return NULL
			 */
			$scope.close = function () {
				$scope.opened = false;
				$scope.currentIndex = -1;
				$scope.currentZoom = 0;
				$scope.slider.close();
			};

			/**
			 * Refreshes the list of images
			 * @return NULL
			 */
			$scope.refresh_image_list = function () {
				$http({

					method: 'POST',
					url: 'image-list.php'

				})
					.success(function (data) {
						$scope.imageList = data['list'];
						$scope.indexList = range(0, data['list'].length-1);
					});
			};

			/**
			 * Sets the current slide
			 * @param {integer} i The index of the slide
			 */
			$scope.setSlide = function (i) {
				if ( 0 <= $scope.indexList.indexOf(i) ) {
					$scope.currentIndex = i;
					$scope.sendToSlider(i);
				}
			};

			/**
			 * Sets the current slide based on user-input
			 */
			$scope.promptSetSlide = function () {
				var i = parseInt(prompt('Inserisci il numero della slide:'))-1;
				if ( 0 <= $scope.indexList.indexOf(i) ) {
					$scope.currentIndex = i;
					$scope.sendToSlider(i);
				}
			};

			$scope.sendToSlider = function (i) {
				if ( 0 <= $scope.indexList.indexOf(i) ) {
					$scope.$broadcast('CHANGE_SLIDE',
						{
							index : i,
							image : $scope.imageList[i],
							time : $scope.transitionTime
						}
					);
				}
			};

			$scope.fadeToColor = function (color) {
				$scope.$broadcast('FADE_COLOR', {
					time : $scope.transitionTime,
					color : color
				});
			};

		}
	);