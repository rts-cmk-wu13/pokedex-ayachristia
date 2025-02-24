"use strict";

let divEl = document.createElement("div");
divEl.classList.add("root");

divEl.innerHTML = `
<header>
    <span>Pokedex</span>
</header>
<main class="pokedex">
<section class="pokedex__grid">
    <section class="pokedex__pokemon">
        <!-- <img src="../img/pokedex.png" alt=""> -->
    </section>
    <section class="pokedex__info">
        <!-- <input type="text" id="pokemonInput" name="pokemonInput" placeholder="search for pokemon.."> -->
    </section>
</section>
    

</main>
<footer>created 2025</footer>
`;

document.querySelector("body").append(divEl);
