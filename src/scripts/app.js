"use strict";

/*
var section = document.querySelector('.intro');
var bigMacImage = document.querySelector('.intro__image');
var imageSize = bigMacImage.clientWidth;
console.log(imageSize);

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
scene.background = new THREE.Color().setHex(0xF5E9D5);


scene.add( light, directionalLight);
//grouper les mesh

const group = new THREE.Group();

//chargement mesh
let topbun;
let topmeat;
let pickles;
let salad;
let middlebun;
let bottommeat;
let botsalad;
let cheese;
let bottombun; 
const loader = new GLTFLoader();

loader.load('./assets/models/topbun.glb',function (gltf){
    topbun = gltf.scene;
    topbun.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshToonMaterial({color: '#E29348' })
        }
    });
    console.log('done');
    group.add(topbun);
    animate();
  });
  loader.load('./assets/models/topmeat.glb',function (gltf){
    topmeat = gltf.scene;
    topmeat.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshToonMaterial({color: '#6C3F29' })
        }
    });
    console.log('done');
    group.add(topmeat);
    animate();
  });
  loader.load('./assets/models/pickles.glb',function (gltf){
    pickles = gltf.scene;
    pickles.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshToonMaterial({color: '#7F711F' })
        }
    });
    console.log('done');
    group.add(pickles);
    animate();
  });
loader.load('./assets/models/topsalad.glb',function (gltf){
    salad = gltf.scene;
    salad.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshToonMaterial({color: '#7BB654' })
        }
    });
    console.log('done');
    group.add(salad);
    animate();
  });
  loader.load('./assets/models/midbun.glb',function (gltf){
    middlebun = gltf.scene;
    middlebun.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshToonMaterial({color: '#E29348' })
        }
    });
    console.log('done');
    group.add(middlebun);
    animate();
  });
  loader.load('./assets/models/botmeat.glb',function (gltf){
    bottommeat = gltf.scene;
    bottommeat.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshToonMaterial({color: '#6C3F29' })
        }
    });
    console.log('done');
    group.add(bottommeat);
    animate();
  });
  loader.load('./assets/models/cheese.glb',function (gltf){
    cheese = gltf.scene;
    cheese.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshToonMaterial({color: '#FFD61F' })
        }
    });
    console.log('done');
    group.add(cheese);
    animate();
  });
  loader.load('./assets/models/botsalad.glb',function (gltf){
    botsalad = gltf.scene;
    botsalad.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshToonMaterial({color: '#7BB654' })
        }
    });
    console.log('done');
    group.add(botsalad);
    animate();
  });
  loader.load('./assets/models/botbun.glb',function (gltf){
    bottombun = gltf.scene;
    bottombun.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshToonMaterial({color: '#E29348' })
        }
    });
    console.log('done');
    group.add(bottombun);
    animate();
    scene.add(group);
    group.position.z = -4
  });
  
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    group.rotation.y+=0.002;
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
*/

