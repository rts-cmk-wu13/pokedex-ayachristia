"use strict";

const artworkUrl =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";

let params = new URLSearchParams(window.location.search);
console.log(params);
let pokeName = params.get("name");
console.log(pokeName);
//retrieving layout elements for append
let pokedexEl = document.querySelector(".pokedex");
let pokemonEl = document.createElement("section");
pokemonEl.classList.add("pokemonEl");

fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("No pokemon by that name");
    }
  })
  .then((pokemon) => {
    console.log(pokemon);
    //moves variabel for the moves section
    // let moves = [];
    pokemon.moves.forEach((move) => {
      fetch(move.move.url)
        .then((res) => res.json())
        .then((move) => {
          let movesList = pokemonEl.querySelector(".pokemon__moves-ul");
          movesList.innerHTML += `
          <li class="pokemon__moves-listItem" data-move="${move.name}">${move.name}</li>
          `;

          let movesListItems = pokemonEl.querySelectorAll(
            ".pokemon__moves-listItem"
          );
          movesListItems.forEach((listItem) => {
            listItem.addEventListener("click", function (event) {
              let clickedItem = event.target.dataset.move;
              let clickedDetails = pokemon.moves.find(
                (move) => move.move.name == clickedItem
              );
              console.log(clickedDetails);
              let moveView = pokemonEl.querySelector(".pokemon__moves-view");
              fetch(clickedDetails.move.url)
                .then((res) => res.json())
                .then((details) => {
                  moveView.innerHTML = `
              <h2>${details.name}</h2>
              <p>${details.power}</p>
              <p>${details.pp}</p>
              <p>${details.accuracy}</p>
              <p>${details.type.name}</p>
              <p>${details.damage_class.name}</p>
              <p>${details.effect_entries[0].effect
                .split(/[\n|,./]+/)[0]
                .trim()}</p>

              `;
                  console.log(details);
                });

              // fetch(clickedDetails.url)
            });
          });
        });
    });

    //fetching from species to about section beneath
    fetch(pokemon.species.url)
      .then((res) => res.json())
      .then((species) => {
        console.log(species);
        //flavor text
        const flavorText = `"${species.flavor_text_entries[9]?.flavor_text}"`;
        document.querySelector(".pokemon__flavor-text").textContent =
          flavorText;
        //species type
        const speciesType = species.genera
          .find((genus) => genus.language.name === "en")
          .genus.slice(0, -7);
        document.querySelector(".pokemon__info-species").textContent =
          speciesType;
        //gender
        let genderPara = document.querySelector(".pokemon__breeding-gender");
        let genderRate = species.gender_rate;
        if (genderRate == 0) {
          genderRate = `Genderless`;
          //(Pokémon like Magnemite, Voltorb)
          genderPara = genderRate;
        }
        if (genderRate == 1) {
          genderRate = `87.5% Male, 12.5% Female`;
          genderPara.textContent = genderRate;
        }
        if (genderRate == 2) {
          genderRate = `50% Male, 50% Female`;
          genderPara.textContent = genderRate;
        }
        if (genderRate == 3) {
          genderRate = `12.5% Male, 87.5% Female`;
          genderPara.textContent = genderRate;
        }
        if (genderRate == 4) {
          genderRate = `100% Female`;
          genderPara.textContent = genderRate;
        }
        //egg groups
        let eggGroups = species.egg_groups;
        let eggGroupsList = eggGroups
          .map((egg) => {
            let capitalizedEggGroup =
              egg.name.charAt(0).toUpperCase() + egg.name.slice(1);
            return `${capitalizedEggGroup}`;
          })
          .join(" ");
        document.querySelector(".pokemon__breeding-egg").textContent =
          eggGroupsList;

        fetch(species.evolution_chain.url)
          .then((res) => res.json())
          .then((evolution) => {
            fetch(evolution.chain.evolves_to[0].species.url).then((res) =>
              res.json().then((chain) => {
                let evolutionId = chain.id;

                let evolutionNameEl = pokemonEl.querySelector(
                  ".pokemon__evolution-name"
                );
                let evolutionImgEl = pokemonEl.querySelector(
                  ".pokemon__evolution-imgContainer"
                );

                if (evolutionNameEl && evolutionImgEl) {
                  evolutionNameEl.textContent = chain.name.toUpperCase();
                  evolutionImgEl.innerHTML = `
                 <a class="pokemon__evolution-link" href="detail.html?name=${chain.name}">
                 <img class="pokemon__evolution-img" src="${artworkUrl}/${evolutionId}.png" alt="${chain.name}">
               </a>
                 `;
                }
              })
            );
          });
      });

    //pokemon details
    pokemonEl.innerHTML = `
    <section class="pokemon__nameNum">
        <section class="nameAndType">
        <h2>${pokemon.name}</h2>
            <section class="nameAndType-data">
          ${pokemon.types
            .map((type) => {
              console.log(type);
              return `
            <span>${type.type.name}</span>
            `;
            })
            .join(" ")}
            </section>
        </section>
        <p class="pokemon__id">#${pokemon.id}</p>
  </section>

    <section class="pokemon__image-container">
        <div class="pokemonImg-container"> 
            <img class="pokemonImg pokemonImg-back" src="${
              pokemon.sprites.other["dream_world"].front_default
            }" alt="${pokemon.name}">
        </div>
    </section>
  
<section class="pokemon__info">
      <section class="pokemon__btns">
      <button class="pokemon__btn" data-chart="about">About</button>
      <button class="pokemon__btn" data-chart="stats">Base Stats</button>
      <button class="pokemon__btn" data-chart="evolution">Evolution</button>
      <button class="pokemon__btn" data-chart="moves">Moves</button>
      </section>
        
<section class="pokemon__details">
                       


        <section class="pokemon__detail-section pokemon__about">
          <section class="pokemon__flavor">
                         <p class="pokemon__flavor-text"></p>
                       </section>
            <section class="pokemon__info-section">
              <table class="pokemon__info-table">
              <tr>
              <th>Species</th>
              <td class="pokemon__info-species"></td>
              </tr>     
              <tr>
              <th>Height</th>
              <td class="pokemon__info-height">
              ${((pokemon.height * 2.54) / 100).toFixed(2)} m.
              </td>
              </tr>
              <tr>
              <th>Weight</th>
              <td class="pokemon__info-weight">
              ${pokemon.weight / 100} kg.
              </tr>
              <tr>
              <th>Abilities</th>
              </td>
              <td class="pokemon__info-abilities">
                 ${pokemon.abilities.map((ability) => {
                   return `
                <p>${ability.ability.name}</p>`;
                 })}
              </td>
              </tr>
              </table>

              <section class="pokemon__breeding">
                  <h2>Breeding</h2>
                  <table class="pokemon__breeding-table">
                <tr>
                  <th>Gender</th>
                  <td>
                    <p class="pokemon__breeding-gender"></p>
                  </td>
                </tr>
                        
                <tr>
                  <th>Egg Groups</th>
                  <td class="pokemon__breeding-egg">
                  </td>
                </tr>
                        
                <tr>
                  <th>Egg Cycle</th>
                  <td class="pokemon__breeding-cycle">${
                    pokemon.types[0].type.name.charAt(0).toUpperCase() +
                    pokemon.types[0].type.name.slice(1)
                  }
                  </td>
                </tr>
                
                  </table>
              </section>


          </section>
        </section>

        <section class="pokemon__detail-section pokemon__stats">
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
              <h2 class="pokemon__stats-headline">Type defenses</h2>
              <p class="pokemon__stats-para">The effectiveness of each type on ${
                pokemon.name
              }</p>
            </section>

            
         

          <section class="pokemon__detail-section pokemon__evolution">
            <section class="pokemon__evolution-container">
              <h2>Evolution for <span class="pokemon__evolution-name"></span></h2>
              <div class="pokemon__evolution-imgContainer"></div>
            </section>
          </section>

          <section class="pokemon__detail-section pokemon__moves">
            <section class="pokemon__moves-section">
            <section class="pokemon__moves-list">
              <ul class="pokemon__moves-ul"></ul>
          </section>
          
          <section class="pokemon__moves-view"></section>
            </section>
          </section>
          
        
</section> 

    `;
    pokedexEl.append(pokemonEl);

    // btns events----------------------------------------------------------
    let btnSections = document.querySelectorAll(".pokemon__detail-section");
    let btns = document.querySelectorAll(".pokemon__btn");

    function showElement(clickedEl) {
      clickedEl.classList.remove("pokemon__hidden");
    }
    function hideElement(element) {
      element.classList.add("pokemon__hidden");
    }

    btnSections.forEach((section) => {
      showElement(btnSections[0]);
      section.classList.add("pokemon__hidden");
    });

    btns.forEach((btn) => {
      btn.addEventListener("click", function (event) {
        let clickedBtn = event.target.dataset.chart;
        let clickedEl = document.querySelector(`.pokemon__${clickedBtn}`);
        btnSections.forEach((section) => {
          hideElement(section);
        });
        showElement(clickedEl);
      });
    });
  })
  .catch((error) => {
    console.log(error);
    pokemonEl.innerHTML = `
    <h2>${error.message}</h2>
    <p>Go back to the <a href="index.html">main page</a></p>`;

    pokedexEl.appendChild(pokemonEl);
  });
