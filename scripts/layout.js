"use strict";

let divEl = document.createElement("div");
divEl.classList.add("root");

divEl.innerHTML = `
<header>
    <div class="logo">
        <img src="img/International_Pokémon_logo.svg.png" alt="logo">
    </div>
</header>
<main class="pokedex">
    

</main>
<footer>created 2025</footer>
`;

document.querySelector("body").append(divEl);
