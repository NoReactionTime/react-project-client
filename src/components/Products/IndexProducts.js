import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'

class Products extends React.Component {
  state = {
    products: null
  }
  componentDidMount () {
    axios.get(`${apiUrl}/products`)
      .then(res => console.log(res))
      .then(response => {
        // handle success
        this.setState({
          products: response.data.products
        })
      })
      .catch(error => {
        // handle error
        console.log(error)
      })
  }
  render () {
    console.log(this.state)
    let jsx
    // if the API has not responded yet
    if (this.state.products === null) {
      jsx = <p>Loading...</p>
    // if the API responds with no books
    } else if (this.state.products.length === 0) {
      jsx = <p>No books, please add a book</p>
    // if the API responds with books
    } else {
      jsx = (
        <ul>
          {this.state.products.map(product => {
            return (
              <li key={product._id}>
                <Link to={`/product/${product._id}`}>{product.title}</Link>
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
export default Products
