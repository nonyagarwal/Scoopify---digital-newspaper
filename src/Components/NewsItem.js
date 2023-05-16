import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class NewsItem extends Component {
  render() {
    let {title,description,urlToImage,url,author,date,source} = this.props; //destructuring
    return (
      <div className="card my-3">
      <span className='position-absolute top-0 translate-middle badge rounded-pill bg-info' style={{zIndex: '1', left: '91.5%'}}>{source}</span>
      <img src={urlToImage !== undefined ? urlToImage : "https://www.sodapdf.com/blog/wp-content/uploads/2021/10/When-should-I-use-PNG-or-JPG.jpg"} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title}..</h5>
          <p className="card-text">{description}..</p>
          <p className="card-text"><small className="text-muted"> By {!author? "unknown": author} on {new Date(date).toGMTString()} </small></p>
          <Link to={url} target="_blank" className="btn btn-sm btn-dark">Read More</Link>
        </div>
      </div>
    )
  }
}
