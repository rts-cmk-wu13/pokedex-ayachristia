"use strict";
// --------------------------------GLOBAL - to call inside different scopes -------------------------------------------------
//creating new offset to show next 8
const URL = new URLSearchParams(window.location.search);
const OFFSET = parseInt(URL.get("offset") || "0");

//retrieving layout, search section - to append search and list items
let pokedexInfo = document.querySelector(".pokedex__info");
let pokedexSearch = document.createElement("section");
pokedexSearch.classList.add("pokedex__search");
//initializing pokemonArray globally to update it within functions
let pokemonArray = [];
//retrieving id from pokemon beneath via function
function getPokemonId(pokemonURL) {
  return pokemonURL.slice(0, -1).split("/").pop();
}
//ctreate a function to update the pokelist items dynamicly
function updatePokemonList(array) {
  let pokemonlistHTML = array
    .map((pokemon) => {
      return `
    <li class="pokelist__pokemon"><a href="detail.html?id=${getPokemonId(
      pokemon.url
    )}">${pokemon.name}</a></li>
    `;
    })
    .join(" ");

  document.querySelector(".pokelist__list").innerHTML = pokemonlistHTML;
}

pokedexSearch.innerHTML = `
        <form action="./detail.html" class="searchForm" autocomplete="off">
            <input type="search" class="searchForm__Input" name="id" placeholder="choose pokemon..">
            <button type="submit" class="searchForm__btn">GO!</button>
            <datalist id="pokemons"></datalist>
        </form>
        <section class="pokelistFilter">
            <button class="pokelistFilter__types">Types</button>
            <button class="pokelistFilter__abilities">Abilities</button>
        </section>
        
        <section class="pokelist">
            <ul class="pokelist__list"></ul>
            <section class="pokelist__btns">
                <a href="" class="pokelist__btns-prev">Prev</a>
                <a href="" class="pokelist__btns-next">Next</a>
            </section>
        </section>
        
        `;
pokedexInfo.append(pokedexSearch);
//-----------fetch for retrieving pokemons for pokelis width limit of 8 at a time---------------------------
fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${OFFSET}`)
  .then((response) => response.json())
  .then((data) => {
    //store API results in pokemonArray initialy
    pokemonArray = data.results;

    //DOM input search form and pokemon list
    //prev-next btns
    let prevPokelist = document.querySelector(".pokelist__btns-prev");
    let nextPokelist = document.querySelector(".pokelist__btns-next");
    //creating the PREV+NEXT btns for pokelist
    const LAST_OFFSET = data.count - (data.count % 20);
    //determin the last standing index of full pokelist: 1340
    prevPokelist.href = `/?offset=${Math.max(OFFSET - 20, 0)}`;
    nextPokelist.href = `/?offset=${Math.min(LAST_OFFSET, OFFSET + 20)}`;

    //Set the pokemonArray in pokelist items initialy
    updatePokemonList(pokemonArray);
  });

//----------------------fetch ALL POKEMONS for search filtering and event updating pokelist-------------------------------------------------
fetch(`https://pokeapi.co/api/v2/pokemon?limit=1340&offset=0`)
  .then((response) => response.json())
  .then((data) => {
    // initialise new pokemonArray inside this fetch to filter later on
    // pokemonArray = data.results;
    //create event for searchform to update pokelist or go to details.html
  });
