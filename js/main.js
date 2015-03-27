// ANGULAR APP \\

angular.module('advPre', ['ngAnimate'])

	.controller('interfaceController',
		function($scope, $http) {

			$('[data-toggle="tooltip"]').tooltip()

			/**
			 * Slider open status
			 * @type {Boolean}
			 */
			$scope.opened = false;

			$scope.imageList = [];


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
			    $scope.slider = window.open('slider.html','slider','modal=yes,alwaysRaised=yes,location=0,menubar=0,resizable=0,fullscreen=1');
			}

			/**
			 * Closes the slider
			 * @return NULL
			 */
			$scope.close = function () {
				$scope.opened = false;
				$scope.slider.close();
			}

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
					});
			}

		}
	);