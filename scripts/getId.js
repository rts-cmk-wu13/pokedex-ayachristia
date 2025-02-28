//DOM input search form and pokemon list
// //prev-next btns
// let prevPokelist = document.querySelector(".pokelist__btns-prev");
// let nextPokelist = document.querySelector(".pokelist__btns-next");
// //creating the PREV+NEXT btns for pokelist
// const LAST_OFFSET = data.count - (data.count % 20);
// //determin the last standing index of full pokelist: 1340
// prevPokelist.href = `/?offset=${Math.max(OFFSET - 20, 0)}`;
// nextPokelist.href = `/?offset=${Math.min(LAST_OFFSET, OFFSET + 20)}`;

// let pokemonListFLASH = "";
// pokemonArray.forEach((pokemon) => {
//   fetch(pokemon.url)
//     .then((res) => res.json())
//     .then((details) => {
//       console.log(details);
//       pokemonListFLASH += `
//       <a href="detail.html?id=${details.id}">

//     <div class="pokelist__card">
//         <p class="pokelist__card-ident">${details.name}</p>

//         <div class="pokelist__card-img-container">
//         <img src="${details.sprites.front_default}" alt="${details.name}">
//         </div>

//         <div class="pokelist__card-type">
//         <p class="pokelist__card-type-id" >#${details.id}</p>
//         <h2>Type</h2>
//         <span>
//         <p>${details.types[0].type.name}</p>
//         <p>${details.types[1].type.name}</p>
//         </span>
//         </div>

//     </div>

//     </a>
//       `;
//       document.querySelector(".pokelist__list").innerHTML =
//         pokemonListFLASH;
//     });
// });

//---------------FETCH pokemonTypes + typesList------------------
// let typeBtn = pokedexSearch.querySelector(".pokelistFilter__types");

// typeBtn.addEventListener("click", function () {
//   fetch(`https://pokeapi.co/api/v2/type`)
//     .then((response) => response.json())
//     .then((data) => {
//       pokemonTypesArray = data.results;
//       updatePokemonTypeList(pokemonTypesArray);
//     });
// });

// function updatePokemonTypeList(array) {
//   let pokemonTypeList = array
//     .map((type) => {
//       return `
//         <li class="pokelist__types">${type.name}</li>
//         `;
//     })
//     .join("");
//   document.querySelector(".pokelist__list").innerHTML = pokemonTypeList;

//   document.querySelectorAll(".pokelist__types").forEach((element) => {
//     element.addEventListener("click", getTypesList);
//   });
// }

// function getTypesList(event) {
//   let clickedTypeName = event.target.innerHTML;

//   fetch(`https://pokeapi.co/api/v2/type/${clickedTypeName}`)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       pokemonTypesArray = data.pokemon;
//       updatePokemonTypesList(pokemonTypesArray);
//     });
// }

// function updatePokemonTypesList(array) {
//   let pokemonTypeslist = array
//     .map((pokemon) => {
//       console.log(pokemon);
//       return `
//         <li class="pokelist__type"><a href="detail.html?id=${getPokemonId(
//           pokemon.pokemon.url
//         )}">${pokemon.pokemon.name}</a></li>
//         `;
//     })
//     .join("");
//   document.querySelector(".pokelist__list").innerHTML = pokemonTypeslist;
// }

// let pokelistabilities = document.querySelector(".pokelistFilter__abilities");

//retrieving id from pokemon
// function getPokemonId(pokemonURL) {
//     return pokemonURL.slice(0, -1).split("/").pop();
//   }

// --------------------------------GLOBAL - to call inside different scopes -------------------------------------------------
// //creating new offset to show next 8
// const URL = new URLSearchParams(window.location.search);
// const OFFSET = parseInt(URL.get("offset") || "0");

// <!-- <section class="pokelistFilter">
// <button class="pokelistFilter__types">Types</button>
// <button class="pokelistFilter__abilities">Abilities</button>
// </section> -->

// <!-- <section class="pokelist__btns">
// <a href="" class="pokelist__btns-prev">Prev</a>
// <a href="" class="pokelist__btns-next">Next</a>
// </section> -->
