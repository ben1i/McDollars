"use strict";

/*
var section = document.querySelector('.intro');
var bigMacImage = document.querySelector('.intro__image');
var imageSize = bigMacImage.clientWidth;
console.log(imageSize);

fetch('./assets/data/data.json')
    .then(function(data) {
        return data.json();
    })
    .then(function(data) {
        console.log(data);

        var basePrice = data[0].bigmacindex
        var relation = data[27].bigmacindex / basePrice;
        console.log(relation);

        for (let i = 0; i < Math.floor(relation); i++) {   
            var burger = document.createElement('div');
            burger.classList.add('burger');
            burger.style.width = imageSize / relation + "px";
            burger.style.height = imageSize / relation + "px";
            
            var burgerImage = document.createElement('img');
            burgerImage.src = "./assets/images/bigmac-mobile.png";
            burgerImage.alt = "Big Mac";
            burgerImage.style.width = "100%";
            burger.appendChild(burgerImage);

            section.appendChild(burger);
        }
    })
    .catch(function(error) {
        console.error(error);
    });
*/

