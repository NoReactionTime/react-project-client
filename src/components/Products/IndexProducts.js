import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import apiUrl from '../../apiConfig'
import { Row, Col } from 'react-bootstrap'
class IndexProducts extends React.Component {
  state = {
    products: null
  }
  componentDidMount () {
    axios.get(`${apiUrl}/products`)
      .then(response => {
        console.log(response)
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
        <Container>
          <Row>
            {this.state.products.map(product => {
              return (
                <Col sm={4} key={product._id}>
                  <img width={200} height={200} src={product.image}/>
                  <Link to={`/products/${product._id}`}><h3>{product.name}</h3></Link>
                  <h4>Description: {product.description}</h4>
                  <h4>Price: $ {product.unitPrice}</h4>
                </Col>
              )
            })}
          </Row>
        </Container>
      )
    }
    return (
      <div>
        <h2>Products:</h2>
        {jsx}
      </div>
    )
  }
}
export default IndexProducts
