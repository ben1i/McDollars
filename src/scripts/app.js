"use strict";


var section = document.querySelector('.intro');


//burger3d
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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
        console.log(`Modèle chargé: ${name}`);
    })
    
}
modelData.forEach((data, index) => {
    loadModels(data.url, data.material, modelData[index].url.split('/').pop().split('.')[0]);
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



var section = document.querySelector('.intro');
var bigMacImage = document.querySelector('.intro__image');
var imageSize = bigMacImage.clientWidth;
console.log(imageSize);

var currentDateDiv = document.querySelector('.intro__date');
var currentDate = Number(currentDateDiv.textContent);
console.log(currentDate);

var priceDiv = document.querySelector('.intro__price');
var priceInflationDiv = document.querySelector('.intro__priceInflation');
var medianIncomeDiv = document.querySelector('.intro__medianIncome');

fetch('./assets/data/data.json')
    .then(function(data) {
        return data.json();
    })
    .then(function(data) {
        console.log(data);

        /*var basePrice = data[0].bigmacindex
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
        }*/


       data.forEach(element => {
            if (element.year === currentDate) {
                priceDiv.textContent = element.bigmacindex + " $";
                priceInflationDiv.textContent = element.bigmacindexinflation + " $";
                medianIncomeDiv.textContent = element.medianincome + "K $";
            }
       });
    })
    .catch(function(error) {
        console.error("Problème lors du chargement des données");
    });