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
const meshes = {};
function loadModels(url, material, name, index = 0){
    loader.load(url, function (gltf){
        const modele = gltf.scene;
        let meshIndex = 0;
        modele.traverse((child) => {
            if (child.isMesh){
                child.material = material;
                meshes[name] = child;
                group.add(child);
                meshIndex++; 
                
            }
        });

        loadedModels.push({name: name, model: modele});
        group.add(modele);

    })
    
}
modelData.forEach((data) => {
    const name = data.url.split('/').pop().split('.')[0];
    loadModels(data.url, data.material, name); // Passer le nom pour l'assignation dans l'objet meshes
});

//
const ingr = document.querySelector('.timeline__switch')
let bool = true;
ingr.addEventListener("click", function(){
    bool = !bool;
    console.log(bool)
    if(bool==false){
        ingr.innerText = "BigMac";
        //animation burger
        gsap.to(camera.position,{
            z: 2,
            duration: 1
        });
        gsap.to(meshes['topbun'].position,{y:1})
        gsap.to(meshes['topmeat'].position,{y:1.5})
        gsap.to(meshes['pickles'].position,{y:0.3})
        gsap.to(meshes['midbun'].position,{y:0.25})
        gsap.to(meshes['botmeat'].position,{y:-0.3})
        gsap.to(meshes['botsalad'].position,{y:-1.2})
        gsap.to(meshes['cheese'].position,{y:-1.5})
        gsap.to(meshes['botbun'].position,{y:-1})
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
        gsap.to(meshes['topbun'].position,{y:0.1})
        gsap.to(meshes['topmeat'].position,{y:0.9})
        gsap.to(meshes['pickles'].position,{y:0.08})
        gsap.to(meshes['midbun'].position,{y:0.65})
        gsap.to(meshes['botmeat'].position,{y:0.25})
        gsap.to(meshes['botsalad'].position,{y:-0.4})
        gsap.to(meshes['cheese'].position,{y:-0.5})
        gsap.to(meshes['botbun'].position,{y:0.3})

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

var timelineList = document.querySelector('.timeline__btns');

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
                    breadPriceDiv.textContent = "N/A";
                } else {
                    breadPriceDiv.textContent = element.bigmacbreadprice + "$";
                }

                if (!element.bigmacbeefprice) {
                    beefPriceDiv.textContent = "N/A";
                } else {
                    beefPriceDiv.textContent = element.bigmacbeefprice + "$";
                }

                if (!element.bigmaclettuceprice) {
                    lettucePriceDiv.textContent = "N/A";
                } else {
                    lettucePriceDiv.textContent = element.bigmaclettuceprice + "$";
                }

                if (!element.bigmaccheddarprice) {
                    cheddarPriceDiv.textContent = "N/A";
                } else {
                    cheddarPriceDiv.textContent = element.bigmaccheddarprice + "$";
                }

                if (!element.bigmacbreadprice) {
                    breadPriceDiv.textContent = "N/A";
                } else {
                    totalPriceDiv.textContent = element.bigmacprice + "$";
                }

                if (!element.bigmacbreadprice) {
                    profitDiv.textContent = "N/A";
                } else {
                    var profit = element.bigmacindex - element.bigmacprice
                    profitDiv.textContent = profit.toFixed(2) + "$";
                }
            });

       });
    })
    .catch(function(error) {
        console.error("Problème lors du chargement des données");
        console.log(error);
    });