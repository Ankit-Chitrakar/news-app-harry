import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {newsTitle, description, newsUrl, urlImage, author, date, source} = this.props
    return (
        <div className="card">
          <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'absolute',
          right: '0'}}>
           <span className="badge rounded-pill bg-danger">{source}</span>
           </div>
          <img src={urlImage} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{newsTitle}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {author?author:'unknown'} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-primary">Read More</a>
          </div>
      </div>
    )
  }
}

export default NewsItem