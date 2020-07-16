import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'

class IndexProducts extends React.Component {
  state = {
    products: null
  }
  componentDidMount () {
    axios.get(`${apiUrl}/products`)
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
    let jsx
    // if the API has not responded yet
    if (this.state.products === null) {
      jsx = <p>Loading...</p>
    // if the API responds with no books
    } else if (this.state.products.length === 0) {
      jsx = <p>No products</p>
    // if the API responds with books
    } else {
      jsx = (
        <ul>
          {this.state.products.map(product => {
            return (
              <li key={product._id}>
                <Link to={`/products/${product._id}`}>{product.name}</Link>
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
export default IndexProducts
