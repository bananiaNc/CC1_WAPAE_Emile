"use strict";


const $startBtn = document.getElementById("start-btn");
const $guessBtn = document.getElementById("guess-btn");
const $cowBtn = document.getElementById("cow-btn");
const $output = document.getElementById("output");
const $numUsr = document.getElementById("num-usr");
const $maxUsr = document.getElementById("max-usr");

let secretNumber = 0;
let nbGuesses = 0;
let maxGuesses = 0;
const evt_btn = "click";

let numUsrValue;



$maxUsr.setAttribute("value", 0); // Affiche à 0 valeut de l'input (#max-usr)
$numUsr.setAttribute("value", 0); // Affiche à 0 valeut de l'input (#num-usr)

function launchGame(_evt) {
  console.info("Fonction launchGame...")
  
  const NB_MAX = parseInt($maxUsr.value); // Récupère la valeur d'input et le convertit en entier
  secretNumber = Math.floor(Math.random() * NB_MAX) + 1; // Nombre à trouver
  maxGuesses = Math.floor(Math.random() * NB_MAX) + 1; // Nombre d'dessai max
  $guessBtn.removeAttribute("disabled"); // Enlève l'attribut disabled
  const messageErreur = `<p class="text-error">Erreur.`;
  $output.innerHTML = `<p class="game-start">Vous disposer de ${maxGuesses} essais.</p>`;
  if (maxGuesses <= 0) {
    $output.innerHTML = `${messageErreur} Max doit être strictement supérieur à 0.</p>`;
  }
  if (nbGuesses === maxGuesses) { 
    $output.innerHTML += `<p class="game-lose">Vous avez perdu. Le nombre mystère était ${secretNumber}</p>`;
    $guessBtn.disabled = "true";
  }
  // Fonction de vérification 
  function check(_evt) {
    console.info("Fonction check...")
    numUsrValue = parseInt($numUsr.value); 
    let actualTry = maxGuesses-nbGuesses
    if (!Number(numUsrValue)) { // Si valeur n'est pas un entier
      nbGuesses++ ; // Incrémentatoin
      $output.innerHTML += `${messageErreur} Obligation de mettre un entier. Vous perdez un essai. ${actualTry}</p>`;
    }
    // Message d'erreur si entrée utilisateur n'est pas dans l'intervalle
    if (numUsrValue > maxGuesses && numUsrValue < 0) { // Si valeur User n'est pas dans l'intervalle
      $output.innerHTML += `${messageErreur} L'entrée doit être dans l'intervalle donnée</p>`;
    } else if (numUsrValue === secretNumber) { // Si User à trouver la réponse
      $output.innerHTML += `<p class="game-win">!!! Vous avez réussi avec ${nbGuesses} essais !!!</p>`;
      $guessBtn.disabled = "true"; // désactive $guessBtn si game est gagné
      $guessBtn.removeEventListener("click");
    } else if (numUsrValue > secretNumber) { // Si valeur User plus grand que la réponse
      nbGuesses++ ;
      $output.innerHTML += `<p class="try-infoPetit" id="try-${nbGuesses}">Faux. Plus petit que ${numUsrValue}. ${actualTry} restants.</p>`;
    } else if (numUsrValue < secretNumber) { // Si valeur User plus petit que la réponse
      nbGuesses++ ;
      $output.innerHTML += `<p class="try-infoGrand" id="try-${nbGuesses}">Faux. Plus grand que ${numUsrValue}. ${actualTry} restants.</p>`;
    }
  }
  $guessBtn.addEventListener("click", check);
}

$startBtn.addEventListener(evt_btn, launchGame);



function addCow(evt) {
  console.debug(evt.x, evt.y);
  const imgCow = document.createElement("img");
  let posYScrollBar = window.scrollY;
  imgCow.src = "https://upload.wikimedia.org/wikipedia/commons/3/30/Cowicon.svg";
  imgCow.alt = "Image d'une vache";
  imgCow.classList.add('cow');
  const angleAleatoire = Math.random() * 360; // Définit l'angle de rotation de l'image
  imgCow.style.position = 'absolute';
  imgCow.style.transform = `rotate(${angleAleatoire}deg)`; // Applique l'angle à l'image
  imgCow.style.left = (evt.clientX - imgCow.width / 2) + 'px';
  imgCow.style.top = ((evt.clientY + posYScrollBar) - imgCow.height / 2) + 'px';
  document.body.appendChild(imgCow);
}

function toggleCow(_evt) {
  if (document.onmousedown instanceof Function) {
    document.onmousedown = null;
  } else {
    document.onmousedown = addCow;
  }
}
$cowBtn.addEventListener("click", toggleCow);

