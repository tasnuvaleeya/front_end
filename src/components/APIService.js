import {useCookies} from "react-cookie";


export default class APIService {
    static UpdateArticle(article_id, body, token){
        return fetch(`http://localhost:8000/api/articles/${article_id}/`, {
            'method': 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        })
            .then(resp => resp.json())
    }

    static InsertArticle(body, token) {
        return fetch('http://localhost:8000/api/articles/', {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static DeleteArticle(article_id) {
        return fetch(`http://localhost:8000/api/articles/${article_id}/`, {
            'method': 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token 35a5059f4135a6f67fc0ca0f065d5e30a2518df6'
            }
        })
    }

    static LoginUser(body, token) {
        return fetch('http://localhost:8000/auth/', {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static RegisterUser(body) {
        return fetch('http://localhost:8000/api/users/', {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }
}