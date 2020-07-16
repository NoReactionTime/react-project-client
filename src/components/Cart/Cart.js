import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
// import Products from '../Product/IndexProducts'
import apiUrl from '../../apiConfig'

const save = require('../../save.js')

class Cart extends Component {
  constructor () {
    super()

    this.state = {
      product: null,
      quantity: null,
      purchased: null
    }
  }

  componentDidMount () {
    axios.get(`${apiUrl}/orderitems`)
      // .then(res => console.log(res))
      .then(response => {
        // handle success
        this.setState({
          product: save.cart.items
        })
      })
      .catch(error => {
        // handle error
        console.log(error)
      })
  }

  render () {
    let jsx
    // if the API has not responded yet
    if (this.state.product === null) {
      jsx = <p>Loading...</p>
    // if the API responds with no books
    } else if (this.state.quantity === 0) {
      jsx = <p>No products</p>
    // if the API responds with books
    } else {
      jsx = (
        <ul>
          {this.state.products.map(product => {
            return (
              <li key={product._id}>
                <Link to={`/orderitems/${product._id}`}>{product.name}</Link>
              </li>
            )
          })}
        </ul>
      )
    }
    return (
      <div>
        <h2>Product Page</h2>
        {jsx}
      </div>
    )
  }
}

export default withRouter(Cart)
