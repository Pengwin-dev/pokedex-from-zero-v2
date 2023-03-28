import SignInComponent from "./components/SingInComponent";
import PokemonCard from "./components/PokemonCard";
import { Routes,Route } from "react-router-dom";
import { PageNotFoundComponent } from "./components/UI/PageNotFound";
// import { ThemeProvider } from "./components/context/ThemeContext";

function App() {

  return (
    <div className="App">
      
         {/* <ThemeProvider>  */}
           <Routes>
            <Route path='/' element= {<SignInComponent/>}></Route>
            <Route path='/home' element={<PokemonCard/>}></Route>
          {/* <Route path='*' element={<PageNotFoundComponent/>}></Route> */}

          </Routes>
         {/* </ThemeProvider>  */}
       
      
      </div>
  );
}
export default App;