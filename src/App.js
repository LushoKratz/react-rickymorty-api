//import M from 'materialize-css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from './Components/Loading';
import ShowCharacter from './Components/ShowCharacter';


function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState();
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  const getData = async () => {
    const getCharacters = await axios.get('https://rickandmortyapi.com/api/character/');
    setCharacters(getCharacters);
    setLoading(false);
    setError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const searchCharacters = await axios.get(`https://rickandmortyapi.com/api/character/?name=${search}`);
      if(searchCharacters){
        setCharacters(searchCharacters);
        setError(false);
        setPage(0);
      }
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  }

  const handleChange = (e) => {
    //setCharacters();
    //console.log(characters.data.results.filter((character) => character.name.toLowerCase().includes(e.target.value)))
    setSearch(e.target.value);
  }

  const prevPage = async () => {
    setLoading(true);
    const newPage = page - 1;
    setPage(newPage);
    const newData = await axios.get(`https://rickandmortyapi.com/api/character/?page=${newPage}`);
      setCharacters(newData);
      setError(false);
      setLoading(false);
  }

  const nextPage = async () => {
    setLoading(true);
    const newPage = page + 1;
    setPage(newPage);
    const newData = await axios.get(`https://rickandmortyapi.com/api/character/?page=${newPage}`);
    
    setCharacters(newData);
    setError(false);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <div className="App blue-grey darken-4">
      <nav>
        <div className="nav-wrapper pink darken-3 p-2">
          <a href="#" className="brand-logo center">Rick And Morty Characters</a>
        </div>
      </nav>
      
      <div className="row">
        <form className="col s12" onSubmit={handleSubmit}>
          <div className="row">

            <div className="input-field col s11 MT">
              <input onChange={handleChange} value={search || ''} id="icon_prefix" type="text" className="validate grey-text text-lighten-2" />
              <i className="material-icons prefix grey-text text-lighten-2">search</i>
              <label htmlFor="icon_prefix grey-text text-lighten-2">Search Character</label>
            </div>

          </div>
        </form>
      </div>
      {error && (<h1 className='MT center-align grey-text text-lighten-2'>Sin resultados</h1>)}
        <div className='center-align Contenedor'>
          {loading ? <Loading /> : <ShowCharacter characters={characters} />  }
        </div>
        <div className="row"> 
           <div className="col s6"></div> 
           {(page > 1) && (
              <button className='col s6btn waves-effect waves-orange' type="submit" name="action" onClick={prevPage}> 
                <i className="material-icons left">navigate_before</i>Prev page
             </button>)}
           {(page < 42) && (
            <button className="col s6btn waves-effect waves-orange" type="submit" name="action" onClick={nextPage}>
              <i className="material-icons right">navigate_next</i> Next Page
            </button>
           )}
        </div>
    </div>
  );
}

export default App;
