"use strict";
//retrieve url
//set variable id to params.get(id)
//retrieve id fra url

let params = new URLSearchParams(window.location.search);
console.log(params);
let id = params.get("id");
console.log(id);
//retrieving layout elements for append
let pokedexPokemon = document.querySelector(".pokedex__pokemon");
let pokedexInfo = document.querySelector(".pokedex__info");
//creating sections for each layout element
let pokeSpotEl = document.createElement("section");
pokeSpotEl.classList.add("pokespot");
let pokeDetailsEl = document.createElement("section");
pokeDetailsEl.classList.add("pokedetails");

fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    pokeSpotEl.innerHTML = `
    <section class="pokespot__name">
        ${data.name}
    </section>
    <div class="pokespot__container">    
        <img class="pokespot__img pokespot__img-front" src="${data.sprites.front_shiny}" alt="${data.name}">
    </div>
    <div class="pokespot__container"> 
        <img class="pokespot__img pokespot__img-back" src="${data.sprites.back_shiny}" alt="${data.name}">
    </div>   
    
    
    <button class="pokespot__toggle-view">back view</button>
    `;
    pokedexPokemon.append(pokeSpotEl);

    function convertHeight(height) {
      let heightDecimal = (height * 2.54) / 100;
      let heightFormatted = heightDecimal.toFixed(2);
      return heightFormatted;
    }

    pokeDetailsEl.innerHTML = `
    <h2 class="pokedetails__specs">Specifications</h2>
    <p class="pokedetails__Height">Height: ${convertHeight(data.height)}m.</p>
    <p class="pokedetails__Weight">Weight: ${data.weight / 1000}kg.</p>
    <p class="pokedetails__Abilities">Abilities: ${data.abilities.map(
      (ability) => {
        return `
        <li>${ability.ability.name}</li>
        `;
      }
    )}</p>
    <p class="pokedetails__Type"></p>
    `;
    pokedexInfo.append(pokeDetailsEl);
  });
