import React, { Component } from 'react'

export default class Newsitems extends Component {
  render() {
  let  {title,description,imgUrl,newsUrl,author1,date,source1}=this.props;
    return (
      <div>
        {/* {element.description ?element.description.slice(0,88):"No description is avaliable"} */}
        <div className="card">
  <img src=  {! imgUrl ? "https://media.cnn.com/api/v1/images/stellar/prod/01-ap934424284207.JPG?c=16x9&q=w_800,c_fill":imgUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}  ...</h5>
    <p className="card-text">{description}  ...</p>
     <span class="badge text-bg-danger my-2">{source1}</span>
    <div class="card-footer">
      <small class="text-body-secondary"><b>Publised By</b>  {author1} <b>On</b> {new Date(date).toGMTString()}</small>

    </div>
    <a href={newsUrl} target='_blank' rel="noreferrer" class="btn btn-success my-2  ">Read More</a>
  </div>
</div>
      </div>
    )
  }
}
