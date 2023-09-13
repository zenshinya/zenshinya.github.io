import { Routes, Route } from "react-router-dom";

import PokemonSleep from "./PokemonSleep";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route path="pokemon-sleep" element={<PokemonSleep />} />
      </Route>
    </Routes>
  );
}

export default App;
