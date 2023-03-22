import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Container , Dimmer, Loader } from 'semantic-ui-react'
import Home from './components/Home'
import People from './components/People'
import Planets from './components/Planets'

function App() {
  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPeople() {
      let response = await fetch("https://swapi.co/api/people/?format=json");
      let data = await response.json();
      setPeople(data.results);
      setLoading(false)
    }

    async function fetchPlanets() {
      let response = await fetch("https://swapi.co/api/planets/?format=json");
      let data = await response.json();
      setPlanets(data.results);
      setLoading(false)
    }
    // console.log('people', people)
    // console.log('planets', planets)
    fetchPeople();
    fetchPlanets();
    
  }, []);

  return (
    <div>
      <Router>
        <NavBar />
<Container>
 {loading ? ( 
<Dimmer active inverted>
  <Loader inverted>Loading</Loader>
</Dimmer>

 ) : (
  <Routes>
  <Route exact path='/'><Home/></Route>
    <Route exact path ='/people'><People data={people} /></Route>
    <Route exact path ='/planets'><Planets  data={planets}/></Route>
    </Routes>
 )}

</Container>
      </Router>
    </div>
  );
}

export default App;
