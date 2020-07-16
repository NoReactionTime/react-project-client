import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'

class ShowProduct extends React.Component {
  state = {
    product: null
  }

  componentDidMount () {
    axios.get(`${apiUrl}/products/` + this.props.match.params.id)
      .then(response => {
      // handle success
        this.setState({
          product: response.data.product
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
    // after API responds
    } else {
      jsx = (
        <div>
          <h3>{this.state.product.name}</h3>
          <h4>Description: {this.state.product.description}</h4>
          <h4>Price: ${this.state.product.unitPrice}</h4>
        </div>
      )
    }
    return (
      <div>
        <h2>Single Product Page</h2>
        {jsx}
      </div>
    )
  }
}

export default ShowProduct
