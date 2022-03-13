import React, {useEffect, useState} from "react";
import APIService from "./APIService";

import {useCookies} from "react-cookie";
function Form (props) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [token, setToken] = useCookies(['loginToken'])

    useEffect(() => {
        setTitle(props.article.title)
        setDescription(props.article.description)
    }, [props.article])

    const updateArticle = () => {
        APIService.UpdateArticle(props.article.id, {title, description}, token['loginToken'])
            .then(resp => props.updatedInformation(resp))
    }
    const  insertArticle = () => {
        APIService.InsertArticle({title, description}, token['loginToken'])
            .then(resp => props.insertedInformation(resp))
    }

    return (
        <div>
            {props.article ? (
                <div className="mb-3">
                    <label htmlFor='title' className='form-label'>Title</label>
                    <input type="text" className="form-control" id="title" placeholder="Please Enter The Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <label htmlFor='description' className='form-label'>Description</label>
                    <textarea  className="form-control" id="description" placeholder="Please Enter The description" rows="5" onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
                    <br/>
                    {
                        props.article.id ? <button onClick={updateArticle} className="btn btn-success">Update</button> :
                            <button onClick={insertArticle} className="btn btn-primary">Insert Article</button>
                    }
                </div>

            ): null}
        </div>
    )
}

export default Form