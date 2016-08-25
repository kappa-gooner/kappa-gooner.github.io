define(["i18n!nls/loc"], function (loc) {
    'use strict';
    return {
        productsTypeHTMLString: function (product, cashback) {
            var str = '';

            var discountElement = this.getDiscountElement(false, product.sellingPrice, product.discountedPrice);
            // Adding the price string
            var priceElement = this.getPriceElement(product.discountedPrice);
            // Adding button info
            var btnElement = this.getBtnElement(cashback);
            // Adding image info
            var imgElement = this.getImageElement(product.image);
            // Adding name info
            var nameElement = this.getNameElement(product.name);

            str += this.getWrapperDiv(product.productLink, imgElement, nameElement, discountElement, priceElement, btnElement);
            return str;
        },

        detailsTypeHTMLString: function (detail, cashback) {
            var str = '';
            var discountElement = this.getDiscountElement(true, null, null, detail.discount);

            var sellingPrice = Math.floor(detail.originalPrice - (detail.originalPrice * detail.discount));
            var priceElement = this.getPriceElement(sellingPrice);

            var btnElement = this.getBtnElement(cashback);
            var imgElement = this.getImageElement(detail.pic);
            var nameElement = this.getNameElement(detail.title);

            str += this.getWrapperDiv(detail.link, imgElement, nameElement, discountElement, priceElement, btnElement);
            return str;
        },

        getDiscountElement: function (isDiscountValProvided, sellingPrice, discountedPrice, discountVal) {
            var isNotDiscounted = true;

            // Handle case where direct discount value is provided
            if (isDiscountValProvided) {
                isNotDiscounted = (discountVal < 0.005);
            } else {
                isNotDiscounted = (sellingPrice - discountedPrice < 0.1);
            }

            // Piece together the discount string
            var discountStr = '';
            if (isNotDiscounted) {
                discountStr = '<b>'+ loc.special +'</b>';
            } else if (isDiscountValProvided) {
                discountStr = '<b>' + Math.ceil((discountVal * 100)).toString() + '</b>%';
            } else {
                var discount = sellingPrice - discountedPrice;
                var discountPercentage = Math.ceil(discount / sellingPrice * 100).toString();
                discountStr = '<b>' + discountPercentage + '</b>%';
            }

            return $('<div>').addClass("discount-style")
                .html(discountStr)
                .prop('outerHTML');
        },

        getPriceElement: function (discountedPrice) {
            return $('<div>').addClass("price-style")
                .html('<b>' + discountedPrice.toString() + '</b>'+ loc.currency)
                .prop('outerHTML');
        },

        getImageElement: function (imgSrc) {
            return $('<img>').addClass('img-responsive center-block')
                .attr('src', imgSrc)
                .prop('outerHTML');
        },

        getBtnElement: function (cashback) {
            return $('<a>').addClass("btn btn-danger")
                .html(cashback + loc.cashback)
                .prop('outerHTML');
        },

        getNameElement: function (name) {
            return $('<div>').addClass("row text-center name-style")
                .html(name.trimToLength(30))
                .prop('outerHTML');
        },

        getWrapperDiv: function (link, img, name, discount, price, btn) {
            return '<div onclick="window.open(\'' + link + '\', \'_blank\');"' +
                'class="panel panel-default">' +
                '<div class="row">' +
                '<div class="panel-body">' +
                img +
                '</div>' +
                '</div>' +
                name +
                '<div class="row text-center ">' +
                discount +
                price +
                '</div>' +
                '<div class="row text-center ">' +
                btn +
                '</div>' +
                '</div>';
        }
    }
});