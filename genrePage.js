import './App.css';
import { useState , useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


function GenrePage() {

  const navigate = useNavigate();
  const location = useLocation();

  const [message, changeMessage] = useState('');
  const [In, changeInput] = useState([]);
  const [sen, changeSen] = useState('');
  const [data, changeData] = useState([]);
  const [popVal, changePopVal] = useState(false);
  const [favorite, setFavorite] = useState(location.state || []);
  const [popFavVal, changeFavVal] = useState(false);


  async function getData() {

    

    if(sen.length > 0){
      const url = "https://openlibrary.org/search.json?subject=" + sen + "&limit=30&readinglog_count:[10000 TO *]";
    
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();

        const arr = [];

        const q = `
          query Test($x: String!) {
            search(
                query: $x,
                query_type: "Book",
                per_page: 1,
                page: 1
            ) {
                results
            }}
        `

        for(let i = 0; i < 15; i++){

          try{

            const req = await fetch(`http://localhost:5010/get-data/${result.docs[i].title}`, {
              method:'POST',
            });

            const r = await req.json(); //put await json together

            if(r.data.search.results.hits[0].document.description.length > 0){
              arr.push({key: i, title: result.docs[i].title, author: result.docs[i].author_name, art: r.data.search.results.hits[0].document.image.url, desc: r.data.search.results.hits[0].document.description});
            }
            else{
            }
          }
          catch{
          }
          
          
        }

        changeData(arr);
        
      } catch (error) {
        console.error(error.message);
      }
    }
    
  }
  

  function OnFormSubmit(){
    changeSen(In.map(a => a.gen).join(' '));
  }

  useEffect(() => {getData()}, [sen]);
  useEffect(() => {
    if(data.length > 0){
      console.log(data);
      changePopVal(false);
      navigate('/mainPage', {state: {dat : data, favor: favorite }});
    }
   }, [data]);
  
   function PopUp({showPopUp, children}){
      if (!showPopUp) {return null}
      return (
        <div className="PopUp" >
            <div style={{"height" : "40%"}}></div>
            <h2>Searching For Your Books</h2>
        </div>
      );
    };


    function FavPop({show, children}){
      if (!show) {return null}
      return (
        <div id="favs">
           <h2 style={{"color" : "white"}}>Favourites:</h2>

                {favorite.map(a => (
                  <>
                    <div id="favBox" >
                      <img id="fav-photo" src={a.art} alt="fav photo" height="10%" width="30%"/>
                        <h3 id="firstFav">{a.title}</h3>
                       <a href={'https://amazon.ca/s?k='+ a.title} target="_blank"><button id="favBut">Buy Book!</button> </a>
                        <button id="favDel" onClick={()=> {
                            setFavorite(favorite.filter(b => b.id !== a.id).map(b => ({ id: b.id -1, title : b.title, auth : b.auth, art: b.art })));
                  }}>Remove</button>
                    </div>
                  <div style={{"height": "2%"}}></div>
                  </>
                ))}
                
        </div>
      )
    }

  return (
    
      <div className="App">
        <FavPop show={popFavVal}/>
        <div style={{"background-color" : "rgb(34, 28, 68)", "height" :"80px"} }></div>
        <div id="tit">
          
          <h1>Welcome to BookWorm</h1>
          
        </div>
        <div class= "top"style={{"height" :"80px"}}>
          <div  style={{"background-color" : "rgb(34, 28, 68)", "height" :"80px", "width" : "200px", "border-radius": "0px 30px 30px 0px", "margin-right": "15px"}}></div>
          <div  id="top-right" onClick={()=>{popFavVal ? changeFavVal(false) : changeFavVal(true)} } style={{"background-color" : "rgb(34, 28, 68)", "height" :"80px", "width" : "100px", "border-radius" : "30px 0px 0px 30px"}}>
            <p id='s2'>Favs </p>
          </div>
        </div>
        <div style={{"height" :"250px"}}></div>
        <div style={{"height" :"250px"}}></div>
        <div style={{"height" :"250px"}}></div>
        <div style={{"height" : "350px"}}></div>
        <div id="text-middle"> 
          <br></br>
          <h2 style={{"color" : "white"}}>Your Next Read Is One Click Away...</h2>
          <br></br>
            <input
              id ="in"
              placeholder="Enter up to three genres"
              value={message}
              onChange={e => changeMessage(e.target.value)}> 
            </input>
            <br></br>
            <div style={{ "height" : "40px"}}>
             <ul style={{"text-align": "center"}}>
              {In.map(put => (
              <>
                <div key={put.id} id="fav" >
                  <h3 style={{"display" : "inline-block", "margin-right" : "5px", "text-align" : "center"}}>{put.gen}</h3>
                  <button style={{"width" : "30px", "height" : "30px"}}onClick={()=> {
                  changeInput(In.filter(a => a.id !== put.id).map(a => ({ id: a.id -1, gen: a.gen })));
                  changeSen('');
                  }}> X </button>

                </div>
                
              </>
              ))}
            </ul>
            
          </div>
          <br></br>
            <button onClick={() => {
            if(In.length < 3 && message.length > 0){
              changeInput ([...In, {id: In.length , gen: message}]);
              changeMessage('');
              
            }
            }}> ADD GENRE </button>
            <button onClick={() => {
              changePopVal(true);
              OnFormSubmit();
            }}> SEARCH </button>
            <br></br>
            
        </div>
        <div></div>

            <PopUp showPopUp={popVal}/>
            {/* <h2>Favourites:</h2>

            <ol>
                {favorite.map(a => (
                    <div style={ {background: "grey", width : "30%", "borderRadius": "15px"}}>
                        <h3>{a.title}</h3>
                        <h3>{a.auth}</h3>
                        <img src={a.art} alt="fav photo" height="100px" width="75px"/>
                        <br/>
                        <a href={'https://amazon.ca/s?k=' + a.title} target="_blank">Buy Book!</a>
                        <br/>
                        <button onClick={()=> {
                            setFavorite(favorite.filter(b => b.id !== a.id).map(b => ({ id: b.id -1, title : b.title, auth : b.auth, art: b.art })));
                  }}>Remove</button>
                    </div>

                ))}
            </ol> */}
      </div>
  );
}

export default GenrePage;
