import logo from './logo.svg';
import './App.css';
import  {useState} from "react";

function App() {

  const [articles, setArticles] = useState([])
  return (
    <div className="App">
        <h3>Django and React </h3>

      {articles.map(article => {
        return <h2>{article}</h2>
      })}
    </div>
  );
}

export default App;
