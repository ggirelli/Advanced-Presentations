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

			$scope.coords = {
				x : 0,
				y : 0
			};
			$scope.tmpCoords = $scope.coords;
			$scope.tmpPointerCoords = $scope.coords;
			$scope.pointerCoords = {
				x : -10,
				y : -10
			};
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
				$scope.currentZoom = 100;
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
					$scope.resetPointer();
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
					$scope.resetPointer();
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

			$scope.controlCoordinates = function (event) {
				var offset = angular.element('#preview-image').offset();
				var width = angular.element('#preview-image').width();
				var height = angular.element('#preview-image').height();
				$scope.tmpCoords = {
					x : parseFloat(((event.pageX - offset.left) / width).toFixed(3)),
					y : parseFloat(((event.pageY - offset.top) / height).toFixed(3))
				}
				$scope.tmpPointerCoords = {
					x : event.pageX,
					y : event.pageY
				}
			};

			$scope.registerCoordinates = function () {
				$scope.coords = $scope.tmpCoords;
				$scope.pointerCoords = $scope.tmpPointerCoords;
			};

			$scope.resetPointer = function () {
				$scope.pointerCoords = {
					x : -10,
					y : -10
				};
			};

			$scope.zoom = function () {
				$scope.$broadcast('ZOOM', {
					x : $scope.coords.x,
					y : $scope.coords.y,
					zoom : $scope.currentZoom,
					time : $scope.transitionTime
				})
			};

		}
	);