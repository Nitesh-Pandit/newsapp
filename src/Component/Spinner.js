import React, { Component } from 'react'
import pinner from './pinner.gif'
export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={pinner} alt="Lodading" />
      </div>
    )
  }
}
