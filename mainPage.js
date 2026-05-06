import './main.css';
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function MainPage({ param }) {

    const dat = {art : "https://covers.openlibrary.org/b/olid/OL29572258M-L.jpg", author: 'Maurice Leblanc', key: 0, title: "Arsène Lupin, gentleman-cambrioleur"};
    const dat2 = {art : "https://covers.openlibrary.org/b/olid/OL46867087M-L.jpg", author: 'Alexandre Dumas', key: 1, title: "Le Comte de Monte Cristo"};
    const location = useLocation();
    const arr = location.state.dat || {};
    const [count, setCount] = useState(0);
    const [fav, setFav] = useState(location.state.favor || []);
    const [lastCount,setLast] = useState(-1);
    const navigate = useNavigate();
    const [popFavVal, changeFavVal] = useState(false);

    function FavPop({show, children}){
      if (!show) {return null}
      return (
        <div id="favs">
           <h2 id='favtitle'>Favourites:</h2>

                {fav.map(a => (
                    <>
                    <div id="favBox" >
                        <img id="fav-photo" src={a.art} alt="fav photo"/>
                         <h3 id="firstFav">{a.title}</h3> 
                        <a href={'https://amazon.ca/s?k='+ a.title} target="_blank"><button id="favBut">Buy Book!</button> </a>
                        {/* <br/> */}
                        <button id="favDel" onClick={()=> {
                            setFav(fav.filter(b => b.id !== a.id).map(b => ({ id: b.id -1, title : b.title, auth : b.auth, art: b.art })));
                            setLast(-1);
                  }}>Remove</button> 
                    </div>
                    <div style={{"height": "2%"}}></div>
                    </>
                ))}

        </div>
      )
    }
    

    return(
        <div id="main">
            <FavPop show={popFavVal}/>
            <div style={{"height" :"80px"}}>
                <div id= "top" onClick={() => {navigate('/',{state: fav})}} style={{"background-color" : "rgb(34, 28, 68)", "height" :"80px", "width" : "90px", "border-radius": "0px 30px 30px 0px", "margin-right": "15px"}}>
                    <p id='s'>Search </p>
                </div>
                <div id= "top-2" style={{ "height" :"80px", "width" : "260px", "border-radius" : "30px 0px 0px 30px"}}></div>
            </div>
            <div id="tit">
            
            <h1>Welcome to BookWorm</h1>
            
            </div>
            <div class= "top" style={{"height" :"80px"}}>
                <div  style={{"background-color" : "rgb(34, 28, 68)", "height" :"100%", "width" : "66%", "border-radius": "0px 30px 30px 0px", "margin-right": "15px"}}></div>
                <div  id="top-right" onClick={()=>{popFavVal ? changeFavVal(false) : changeFavVal(true)} } style={{"background-color" : "rgb(34, 28, 68)", "height" :"80px", "width" : "100px", "border-radius" : "30px 0px 0px 30px"}}>
                    <p id='s2'>Favs </p>
                </div>
            </div>
            
            <div id="middle">   
                <div style={{"height" : "80px"}}></div>
                <div id="spec">
                    <img id="cover"src={arr[count].art} width="40%" height="70%" loading="eager" alt="book cover"/>
                    <div id="back">
                        <h2 id="title">{arr[count].title}</h2>
                        <h3 id="name">{arr[count].author}</h3>
                        <p id="desc">{arr[count].desc}</p> 
                    </div>
                </div>
                <div style={{"height" : "20px"}}></div>
                
                
                <button id="but"onClick={()=> {
                    if(count > 0){
                        setCount(count - 1)
                    }
                    }}> - </button>
                <button onClick={() => {
                    if(lastCount !== count){
                        if(fav.length < 5){
                            setFav([...fav, {id: fav.length, title: arr[count].title, auth:  arr[count].author, art: arr[count].art}]);
                            setLast(count);
                        }
                    }
                }}>favourite</button>
                <button onClick={()=> {
                    if(count < arr.length-1){
                        setCount(count + 1)
                    }
                    }}> + </button>
            </div>
            <div></div>
            {/* <button onClick={() => {navigate('/',{state: fav})}}>Search Again</button> */}

            {/* <h2>Favourites:</h2>
            <ol>
                {fav.map(a => (
                    <div style={ {background: "grey", width : "30%", "borderRadius": "15px"}}>
                        <h3>{a.title}</h3>
                        <h3>{a.auth}</h3>
                        <img src={a.art} alt="fav photo" height="100px" width="75px"/>
                        <br/>
                        <a href={'https://amazon.ca/s?k=' + a.title} target="_blank">Buy Book!</a>
                        <br/>
                        <button onClick={()=> {
                            setFav(fav.filter(b => b.id !== a.id).map(b => ({ id: b.id -1, title : b.title, auth : b.auth, art: b.art })));
                  }}>Remove</button>
                    </div>

                ))}
            </ol> */}
        </div>
    )
}

export default MainPage;