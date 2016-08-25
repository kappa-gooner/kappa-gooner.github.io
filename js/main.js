requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery.1.11.0.min'
    },
    config : {
        i18n: {
            locale: 'ko'
        }
    }
});

requirejs(['require', 'jquery', 'helpers/stringTrimUtil'],
    function   (require, $) {
        'use strict';
        // This needs to be done because owlCarousel has a nested dependency on jquery
        require(['lib/owl.carousel.2.0.0-beta.3.3.min', 'helpers/panelBuilder'],
            function (owlCarousel, panelBuilder) {
                $(document).ready(function() {
                    $.ajax({
                        url: 'products.json',
                        dataType: 'json',
                        success: function(data) {
                            var content = '';
                            var cashback = data["cashback"];

                            //Manipulate the JSON and construct HTML string
                            if(data.hasOwnProperty("products")) {
                                for(var i in data["products"]) {
                                    content += panelBuilder.productsTypeHTMLString(data["products"][i], cashback);
                                }
                            }
                            // Handle other type of json
                            else if(data.hasOwnProperty("details")) {
                                for(var i in data["details"]) {
                                    content += panelBuilder.detailsTypeHTMLString(data["details"][i], cashback);
                                }
                            }

                            $('.owl-carousel').html(content);
                            $('.owl-carousel').owlCarousel({
                                nav:true,
                                margin: 10,
                                loop:true,
                                dots: false,
                                navContainer: '#customNav',
                                dotsContainer: '#customDots',
                                slideBy : 'page',
                                navText: ["<img class='arrows' src='./img/left.png'>",
                                    "<img class='arrows' src='./img/right.png'>"],
                                responsive:{
                                    0:{
                                        items:1,
                                        center: true
                                    },
                                    768:{
                                        items:4,
                                        center: false
                                    }
                                }
                            });
                        }
                    });
                });
        });
    });

