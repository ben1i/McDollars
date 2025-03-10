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


var currentDate = document.querySelector('.ticket__date')

var priceDiv = document.querySelector('.ticket__price');
var priceInflationDiv = document.querySelector('.ticket__priceInflation');
var medianIncomeDiv = document.querySelector('.ticket__medianIncome');

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
            });

       });
    })
    .catch(function(error) {
        console.error("Problème lors du chargement des données");
        console.log(error);
    });