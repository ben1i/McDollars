"use strict";

var section = document.querySelector('.intro');
var bigMacImage = document.querySelector('.intro__image');
var imageSize = bigMacImage.clientWidth;
console.log(imageSize);


//burger3d

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas : document.querySelector('.bg')
})

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.render( scene, camera );


let topbun;
let topmeat;
let pickles;
let salad
let middlebun;
let bottommeat;
let botsalad;
let cheese;
let bottombun; 


const material = new THREE.MeshBasicMaterial({color : "white"});
const loader = new GLTFLoader();

loader.load('./assets/models/topbun.glb',function (gltf){
    topbun = gltf.scene;
    topbun.traverse((child) => {
        if (child.isMesh) {
            child.material = material;
        }
    });
    console.log('done');
    topbun.scale.set(1,1,1);
    topbun.position.z = -4;
    scene.add(topbun);
    animate();
  });
  loader.load('./assets/models/topmeat.glb',function (gltf){
    topmeat = gltf.scene;
    topmeat.traverse((child) => {
        if (child.isMesh) {
            child.material = material;
        }
    });
    console.log('done');
    topmeat.scale.set(1,1,1);
    topmeat.position.z = -4;
    scene.add(topmeat);
    animate();
  });
  loader.load('./assets/models/pickles.glb',function (gltf){
    pickles = gltf.scene;
    pickles.traverse((child) => {
        if (child.isMesh) {
            child.material = material;
        }
    });
    console.log('done');
    pickles.scale.set(1,1,1);
    pickles.position.z = -4;
    scene.add(pickles);
    animate();
  });
loader.load('./assets/models/topsalad.glb',function (gltf){
    salad = gltf.scene;
    salad.traverse((child) => {
        if (child.isMesh) {
            child.material = material;
        }
    });
    console.log('done');
    salad.scale.set(1,1,1);
    salad.position.z = -4;
    scene.add(salad);
    animate();
  });




function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

//

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