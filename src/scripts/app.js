"use strict";
import gsap from 'gsap';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
var section = document.querySelector('.intro');


//burger3d


//mise en place scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas : document.querySelector('.bg')
})

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.render( scene, camera );
const light = new THREE.AmbientLight( 0xffffff, 1, 100);
const directionalLight = new THREE.DirectionalLight( 0xffffff, 3 );
scene.background = new THREE.Color().setHex(0xffe8c4);

scene.add( light, directionalLight);
//grouper les mesh
const group = new THREE.Group();
//chargement mesh

const materials = {
    topbun : new THREE.MeshToonMaterial({color: '#E29348' }),
    topmeat : new THREE.MeshToonMaterial({color: '#6C3F29' }),
    pickles : new THREE.MeshToonMaterial({color: '#7F711F' }),
    salad : new THREE.MeshToonMaterial({color: '#7BB654' }),
    middlebun : new THREE.MeshToonMaterial({color: '#E29348' }),
    bottommeat : new THREE.MeshToonMaterial({color: '#6C3F29' }),
    botsalad : new THREE.MeshToonMaterial({color: '#7BB654' }),
    cheese : new THREE.MeshToonMaterial({color: '#FFD61F' }),
    bottombun : new THREE.MeshToonMaterial({color: '#E29348' })
};

const modelData = [
    { url : './assets/models/topbun.glb', material: materials.topbun },
    { url : './assets/models/topmeat.glb', material: materials.topmeat },
    { url : './assets/models/pickles.glb', material: materials.pickles },
    { url : './assets/models/topsalad.glb', material: materials.salad },
    { url : './assets/models/midbun.glb', material: materials.middlebun },
    { url : './assets/models/botmeat.glb', material: materials.bottommeat },
    { url : './assets/models/cheese.glb', material: materials.cheese },
    { url : './assets/models/botsalad.glb', material: materials.botsalad },
    { url : './assets/models/botbun.glb', material: materials.bottombun }
];

const loader = new GLTFLoader();
//utilisation de l'Ia pour le chargement groupé
const loadedModels = [];

function loadModels(url, material, name){
    loader.load(url, function (gltf){
        const modele = gltf.scene;
        modele.traverse((child) => {
            if (child.isMesh){
                child.material = material;
            }
        });

        loadedModels.push({name: name, model: modele});
        group.add(modele);
        
        /*group.children.forEach((modele, index)=> {
            if (modele.isMesh) {
                gsap.to(modele.position, {
                    y: index*2,
                    duration:1,
                    repeat:-1
                })
            }
        })*/
    })
    
}
modelData.forEach((data, index) => {
    loadModels(data.url, data.material, modelData[index].url.split('/').pop().split('.')[0]);
});



//
const ingr = document.querySelector('.timeline__switch')
let bool = true;
ingr.addEventListener("click", function(){
  bool = !bool;
  console.log(bool)
  if(bool==false){
    ingr.innerText = "BigMac";
        gsap.to(camera.position,{
            z: 2,
            duration: 1
        });
        const tl = gsap.timeline();
        tl.to(".ticketingrédient",{
            y : 10,
            x : - 12,
            duration: 0.5
        })
        tl.to(".ticket", {
            zIndex : -1,
            duration:0
        })
        tl.to(".ticketingrédient",{
            x : 1,
            duration: 0.7
        });
    }else{
        ingr.innerText = "Ingrédients";
        gsap.to(camera.position,{
            z: 0,
            duration: 1
        });
    
        const tl = gsap.timeline();
        tl.to(".ticket",{
            y : -10,
            x :  12,
            duration: 0.5
        })
        tl.to(".ticketingrédient", {
            zIndex : -1,
            duration:0
        })
        tl.to(".ticket",{
            x : 0,
            zIndex:2,
            duration: 0.7
        });
  }
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    group.rotation.y+=0.01;
}

scene.add(group);
group.position.z = -4
animate();
//

if (window.matchMedia("(max-width: 1900px)").matches) {
    camera.position.x = 1;
}

if (window.matchMedia("(max-width: 1750px)").matches) {
    camera.position.x = 1.5;
    camera.position.z = 2;
}

if (window.matchMedia("(max-width: 1600px)").matches) {
    camera.position.x = 4;
}

if (window.matchMedia("(max-width: 1300px)").matches) {
    camera.position.x = 3;
    camera.position.z = 1.5;
}

if (window.matchMedia("(max-width: 1150px)").matches) {
    camera.position.x = 3.5;
    camera.position.z = 2.5;
}

if (window.matchMedia("(max-width: 1050px)").matches) {
    camera.position.x = 4;
    camera.position.z = 4;
}

if (window.matchMedia("(max-width: 950px)").matches) {
    camera.position.z = 4;
}

var currentDate = document.querySelector('.ticket__date')

var priceDiv = document.querySelector('.ticket__price');
var priceInflationDiv = document.querySelector('.ticket__priceInflation');
var medianIncomeDiv = document.querySelector('.ticket__medianIncome');

var timelineList = document.querySelector('.timeline__btns');
var breadPriceDiv = document.querySelector('.ticketingrédient__breadprice');
var beefPriceDiv = document.querySelector('.ticketingrédient__beefprice');
var lettucePriceDiv = document.querySelector('.ticketingrédient__lettuceprice');
var cheddarPriceDiv = document.querySelector('.ticketingrédient__cheddarprice');
var totalPriceDiv = document.querySelector('.ticketingrédient__totalprice');
var profitDiv = document.querySelector('.ticketingrédient__profit');

var timelineList = document.querySelector('.timeline');

fetch('./assets/data/data.json')
    .then(function(data) {
        return data.json();
    })
    .then(function(data) {
        console.log(data);

       data.forEach(element => {

            var timelineItem = document.createElement('button');
            timelineItem.classList.add('timeline__année', 'subtitle');
            timelineItem.textContent = element.year;
            timelineList.appendChild(timelineItem);

            timelineItem.addEventListener('click', function() {
                priceDiv.textContent = element.bigmacindex + " $";
                priceInflationDiv.textContent = element.bigmacindexinflation + " $";
                medianIncomeDiv.textContent = element.medianincome + "K $";
                currentDate.textContent = element.year;

                if (!element.bigmacbreadprice) {
                    breadPriceDiv.textContent = "Pas de donnée pour cette période";
                } else {
                    breadPriceDiv.textContent = element.bigmacbreadprice + "$";
                }

                if (!element.bigmacbeefprice) {
                    beefPriceDiv.textContent = "Pas de donnée pour cette période";
                } else {
                    beefPriceDiv.textContent = element.bigmacbeefprice + "$";
                }

                if (!element.bigmaclettuceprice) {
                    lettucePriceDiv.textContent = "Pas de donnée pour cette période";
                } else {
                    lettucePriceDiv.textContent = element.bigmaclettuceprice + "$";
                }

                if (!element.bigmaccheddarprice) {
                    cheddarPriceDiv.textContent = "Pas de donnée pour cette période";
                } else {
                    cheddarPriceDiv.textContent = element.bigmaccheddarprice + "$";
                }

                if (!element.bigmacbreadprice) {
                    breadPriceDiv.textContent = "Pas de donnée pour cette période";
                } else {
                    totalPriceDiv.textContent = element.bigmacprice + "$";
                }

                if (!element.bigmacbreadprice) {
                    profiteDiv.textContent = "Pas de donnée pour cette période";
                } else {
                    profitDiv.textContent = (element.bigmacindex - element.bigmacprice) + "$";
                }
            });

       });
    })
    .catch(function(error) {
        console.error("Problème lors du chargement des données");
        console.log(error);
    });