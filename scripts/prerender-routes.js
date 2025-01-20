
const TOTAL_POKEMONS=10;
const TOTAL_PAGES=10;
(async ()=> {

  const fs = require('fs');

  // pagination pokemons
  const pokemonIds = Array.from({length:TOTAL_POKEMONS}, (_,i) => i + 1);
  let fileContent = pokemonIds.map(
    id=> `/pokemons/${id}`
  ).join('\n');

  // pages pokemons
  for (let index = 1; index <= TOTAL_PAGES; index++) {
    fileContent += `\n/pokemons/page/${index}`;
  }

  // for pokemons name
  const pokemonNameList = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`)
  .then(res=>res.json());

  fileContent += '\n';
  fileContent += pokemonNameList.results.map(
    pokemon => `/pokemons/${pokemon.name}`
  ).join('\n');

  fs.writeFileSync('routes.txt', fileContent)
  console.log('routes.txt generated');

})();
