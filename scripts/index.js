"use strict";
/**
 * extract id as string from url to pokemon
 * @param {string} pokemonUrl - a url to a pokemon from pokeapi
 * @returns {string}
 */
function getIdFromPokemon(pokemonUrl) {
  return pokemonUrl.slice(0, -1).split("/").pop();
}

const artworkUrl =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";
// ------------------------------------------------------------------------------------------------------------
const options = {
  threshold: 1.0,
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    console.log(entry.target);
    if (entry.isIntersecting) {
      currentOffset += 50;

      if (currentOffset < 1200) {
        fetchPokemon(currentOffset);
      } else {
        console.log("no more pokemons");
      }
    }
  });
}, options);
// ------------------------placeholder observer----------------------------
const imageObserver = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.imagesrc;
      imageObserver.unobserve(entry.target);
    }
  });
});

//layout index
let pokedexEl = document.querySelector(".pokedex");
let sectionElm = document.createElement("section");
sectionElm.classList.add("pokelist");
let pokemonArray = [];

pokedexEl.innerHTML = `
        <form action="./detail.html" class="searchForm" autocomplete="off">
            <input type="search" class="searchForm__Input" name="name" id="name" placeholder="search for pokemon..">
        </form>`;
pokedexEl.append(sectionElm);
// ----------------------------------------------------------------------------------------------------------------------
let currentOffset = 0;
// ----------------------------------------------------------------------------------------------------------------------

function fetchPokemon(offset) {
  fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=50`)
    .then((response) => response.json())
    .then((data) => {
      pokemonArray = data.results;
      console.log(pokemonArray);

      sectionElm.innerHTML += pokemonArray
        .map((pokemon) => {
          console.log(pokemon.name);
          return ` 
      
            <article class="pokelist__pokemon">
            <a class="pokelist__link" href="detail.html?name=${pokemon.name}">
            <div class="pokelist__container-img">
              <img src="/img/placeholder.png" data-imagesrc="${artworkUrl}/${getIdFromPokemon(
            pokemon.url)}.png" alt="${pokemon.name}" class="pokelist__img">
            <!-- src="/img/placeholder.png"  data-imagesrc=""-->
            <!-- <img src="actual-image.jpg" onerror="this.src='placeholder-image.jpg'" alt="Description" loading="lazy"> -->
            </div>
            <h2 class="pokelist__name">${pokemon.name}</h2>
            </a>
        </article>
          `;
        })
        .join("");
      // ----------------------------------------------------------------------------------------------------------------------

      let observedPokemon = sectionElm.querySelector(
        "article:nth-last-child(5)"
      );
      observer.observe(observedPokemon);
      // ----------------------------------------------------------------------------------------------------------------------
      let observedImages = sectionElm.querySelectorAll(".pokelist__img");
      observedImages.forEach((img) => {
        imageObserver.observe(img);
      });
    });
  pokedexEl.appendChild(sectionElm);
}

fetchPokemon(currentOffset);
