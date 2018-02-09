var app = angular.module("darshanApp", ['ui.bootstrap']);

app.controller('darshanCtrl', function($scope) {

	/**
     * Detect Device Type
     */
    $scope.isMobile = false;
    $scope.clickEventType = ((document.ontouchstart !== null) ? 'click' : 'touchstart');

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $scope.isMobile = true;
        angular.element('html').addClass('mobile');
    } else {
        $scope.isMobile = false;
        angular.element('html').addClass('desktop');
    }

    $scope.setWindowScrollAppear = function() {
        var $animate = angular.element('.animate-up, .animate-down, .animate-left, .animate-right');

        if (!$scope.isMobile) {
            $animate.appear();
            $animate.on('appear', function (event, affected) {
                for (var i = 0; i < affected.length; i++) {
                    $(affected[i]).addClass('animated');
                }
            });
            $.force_appear();
        }
    }

    $scope.setProgressBarsFill = function () {
        var $progress_bar = angular.element('.progress-bar');

        if (!$scope.isMobile) {
            $progress_bar.appear();
            $progress_bar.on('appear', function (event, $affected) {
                $scope.setProgressBarsWidth($affected)
            });
            $.force_appear();
        } else {
            $scope.setProgressBarsWidth($progress_bar)
        }
    }

    $scope.setProgressBarsWidth = function(bars) {
        for (var i = 0; i < bars.length; i++) {
            var $bar_fill = $(bars[i]).find('.bar-fill');

            $bar_fill.width($bar_fill.data('width'));
        }
    }

    $scope.openSidebar = function() {
        angular.element('body').addClass('sidebar-opened');
        // lockScroll();
    }

    $scope.closeSidebar = function() {
        angular.element('body').removeClass('sidebar-opened');
        unlockScroll();
    }

    $scope.setWindowScrollAppear();
    $scope.setProgressBarsFill();

    $scope.docReady = function() {

        if (angular.element('.nav-wrap .nav').length > 0) {
            angular.element('.nav-wrap .nav > ul > li > a').append('<span></span>');
        }

        // Sticky Navigation
        var header = angular.element('.header');
        var stickyNav = angular.element('.head-bar');
        var stickyNavHeight = 0;
        var stickyNavigationAppear = function() {                           
            if(stickyNav.length > 0) {
                stickyNav.addClass('animated');
                if (angular.element(window).width() > 767 && !$scope.isMobile) {
                    if (stickyNavHeight < stickyNav.outerHeight()) {
                        stickyNavHeight = stickyNav.outerHeight();
                        header.css('min-height', stickyNavHeight + 'px');
                    }

                    if (angular.element(window).scrollTop() > stickyNav.outerHeight()) {
                        stickyNav.addClass('head-sticky');
                    } else {
                        stickyNav.removeClass('head-sticky');
                    }
                } else {
                    stickyNav.removeClass('head-sticky');
                    header.css('min-height', '0px');
                }
                
            }               
        }
            
        stickyNavigationAppear();
        
        angular.element(window).scroll(function () {
            stickyNavigationAppear();
        });
        
        angular.element(window).scroll(function () {
            stickyNavigationAppear();
        });

        angular.element(document).on($scope.clickEventType, '.btn-sidebar', function () {
            if (angular.element('body').hasClass('sidebar-opened')) {
                $scope.closeSidebar();
            } else {
                $scope.openSidebar();
            }
        });

        /** Reference Slider */
        var ref_slider = angular.element('.ref-slider');
        if (ref_slider.length > 0) {
            for (var i = 0; i < ref_slider.length; i++) {
                var ref_slider_prev = $(ref_slider[i]).closest('.section-box').find('.slider-prev');
                var ref_slider_next = $(ref_slider[i]).closest('.section-box').find('.slider-next');

                angular.element(ref_slider[i]).bxSlider({                    
                    pager: false,
                    controls: true,
                    auto: false,                 
                    speed: 800,
                    pause: 6000,
                    autoHover: true,
                    adaptiveHeight: true,
                    adaptiveHeightSpeed: 500,
                    nextSelector: ref_slider_prev,
                    prevSelector: ref_slider_next,
                    nextText: '<i class="rsicon rsicon-chevron_right"></i>',
                    prevText: '<i class="rsicon rsicon-chevron_left"></i>'
                });
            }
        }
    }

    $scope.docReady();

    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var currIndex = 0;
    var slides = $scope.slides = [{
        image: 'assets/img/uploads/president.jpg',
        had : 'UHCL President Ira K. Blake',
        text: 'This picture was taken during Welcome back bash 2017 where i was representing for University Computing and Telecommunications department',
        id: currIndex++
    }, {
        image: 'assets/img/uploads/miso.jpg',
        had : 'All MISO Officers and Professors',
        text: 'I was Public Relations Officer in MIS Organization',
        id: currIndex++
    }];

});