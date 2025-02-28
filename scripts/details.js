"use strict";

let params = new URLSearchParams(window.location.search);
console.log(params);
let id = params.get("id");
console.log(id);
//retrieving layout elements for append
let pokedexEl = document.querySelector(".pokedex");
let pokemonEl = document.createElement("section");
pokemonEl.classList.add("pokemonEl");

fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  .then((response) => response.json())
  .then((pokemon) => {
    console.log(pokemon);

    fetch(pokemon.species.url)
      .then((res) => res.json())
      .then((species) => {
        console.log(species);
        const flavorText = `"${species.flavor_text_entries[9]?.flavor_text}"`;
        document.querySelector(".pokemon__flavor-text").textContent =
          flavorText;
      });

    pokemonEl.innerHTML = `
    <section class="pokemon__nameNum">
        <h2>${pokemon.name}</h2>
        <p>#${pokemon.id}</p>
    </section>

    <section class="pokemon__image-container">
    <div class="pokemonImages">
            <!-- <div class="pokemonImg-container">    
            <img class="pokemonImg pokemonImg-front" src="${
              pokemon.sprites.other["showdown"].back_default
            }" alt="${pokemon.name}">
        </div> -->
        <div class="pokemonImg-container"> 
            <img class="pokemonImg pokemonImg-back" src="${
              pokemon.sprites.other["dream_world"].front_default
            }" alt="${pokemon.name}">
        </div>
    </div>
        
        <!-- <button class="pokespot__toggle-view">back view</button>   -->
    </section>

    <section class="pokemon__info">
        <table class="pokemon__info-table">
            <tr>
                <th>Height</th>
                <th>Weight</th>
                <th>Abilities</th>
            </tr>
            <tr>
                <td class="pokedetails__Height">
                ${((pokemon.height * 2.54) / 100).toFixed(2)} m.
                </td>
                <td class="pokedetails__Weight">
                 ${pokemon.weight / 100} kg.
                </td>
                <td class="pokedetails__Abilities">
                     ${pokemon.abilities
                       .map((ability) => {
                         return `
                    <p>${ability.ability.name}</p>`;
                       })
                       .join("")}
                </td>
            </tr>
        </table>
        
        <section class="pokemon__details">
            <section class="pokemon__stats">
            ${pokemon.stats
              .map((stat) => {
                return `
                <section class="pokemon__stats-row">
                    <p class="pokemon__stats-type">${stat.stat.name}</p>
                    <div class="pokemon__stats-data-container">
                        <p class="pokemon__stats-data" 
                    style="width: ${stat.base_stat}%;">${stat.base_stat}%</p>
                </div>
                    
                </section>
                `;
              })
              .join("")}
            </section>

            <section class="pokemon__flavor">
            <p class="pokemon__flavor-text"></p>
            </section>
        </section>
        
    </section>

    `;
    pokedexEl.append(pokemonEl);
  });
