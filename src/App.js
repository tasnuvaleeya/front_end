import logo from './logo.svg';
import './App.css';
import  {useState, useEffect} from "react";
import ArticleList from './components/ArticleList'
import Form from './components/Form'
import {useCookies} from "react-cookie";
import {useHistory} from 'react-router-dom'

function App() {

  const [articles, setArticles] = useState([])
  const [editArticle, setEditArticle] = useState(null)
  const [token, setToken, removeToken] = useCookies(['loginToken'])
  let history = useHistory()

  useEffect(() => {
    if (!token['loginToken']) {
      history.push('/')
      // window.location.href = '/'
    }
  }, [token])

    useEffect(() => {
      console.log('useEffect called')
      fetch('http://localhost:8000/api/articles', {
        'method': 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token['loginToken']}`
        }
      })
          .then(resp => resp.json())
          .then(resp => setArticles(resp))
          .catch(error => console.log(error))
    }, [])

  const editBtn = (article) =>{
    setEditArticle(article)
  }

  const deleteBtn = (article) => {
    const newArticles = articles.filter(articleObj => {
      return articleObj.id !== article.id;
    })
    setArticles(newArticles)
  }

  const articleForm = () => {
    setEditArticle({'title': '', description: ''})
  }

  const insertedInformation = (article) => {
    const newArticle = [...articles, article]
    setArticles(newArticle)

  }
  const logoutBtn = () => {
    removeToken(['loginToken'])

  }
  const updatedInformation =(article ) => {

    const newArticle = articles.map(newArticleObj => {
      if (newArticleObj.id === article.id){
        return article
      }
      else {
        return newArticleObj
      }
    })
  setArticles(newArticle)
  }
  return (
    <div className="App">
      <div className = "row">
        <div className = "col">

          <h2>Django And ReactJS Course</h2>
          <br/>
        </div>

        <div className = "col">
          <button onClick={articleForm} className = "btn btn-primary">Insert Article</button>
        </div>
      </div>


        <div className = "col">
          <button onClick = {logoutBtn} className = "btn btn-primary">Logout</button>
        </div>
      <ArticleList articles={articles} editBtn={editBtn} deleteBtn={deleteBtn}/>
      {editArticle ? <Form article={editArticle} updatedInformation={updatedInformation} insertedInformation={insertedInformation}/> : null}


    </div>
  );
}

export default App;
