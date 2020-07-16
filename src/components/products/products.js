// import React from 'react'
// // import axios from 'axios'
//
// // import apiUrl from './../apiConfig.js'
//
// import Container from 'react-bootstrap/Container'
// // import Row from 'react-bootstrap/Row'
// // import Col from 'react-bootstrap/Col'
// import { Row, Col } from 'react-simple-flex-grid'
// import 'react-simple-flex-grid/lib/main.css'
//
// // import carnPlants from '../../carnPlants.json'
//
// // const Plants = () => {
// //   state =
// //   return (
// //     <div className="plants">
// //       {carnPlants.map(carnPlants => <div>{carnPlants.image}</div>)}
// //     </div>
// //   )
// // }
//
// class Plants extends React.Component {
//   constructor () {
//     super()
//     this.state = {
//       product: [
//         {
//           image: '',
//           name: '',
//           description: '',
//           unitPrice: ''
//         }
//       ]
//     }
//   }
//   // handleSubmit = event => {
//   //   event.preventDefault()
//   //   axios({
//   //     method: 'POST',
//   //     url: apiUrl + '/plants',
//   //     data: {
//   //       product: {
//   //         image: this.state.image,
//   //         name: this.state.name,
//   //         description: this.state.description,
//   //         unitPrice: this.state.unitPrice
//   //       }
//   //     }
//   //   })
//   //     .then(res => {
//   //       this.setState({
//   //         image: '',
//   //         name: '',
//   //         description: '',
//   //         unitPrice: ''
//   //       })
//   //     })
//   //     .catch(console.error)
//
//   render () {
//     return (
//       <div>
//         <h2>Our Products</h2>
//         <Container>
//           <Row>
//             <Col><img width={200} height={200} src={'https://i.imgur.com/OR4bdaB.jpg'}/></Col>
//             <Col><img width={200} height={200} src={'https://i.imgur.com/jank2PU.jpg'}/></Col>
//             <Col><img width={200} height={200} src={'https://i.imgur.com/vYleX57.jpg'}/></Col>
//           </Row>
//         </Container>
//       </div>
//     )
//   }
// }
// // {carnPlants.map(carnPlants =>
// //   <div key={carnPlants.image}></div>,
// // <div>{carnPlants.name}</div>,
// // <div>{carnPlants.description}</div>,
// // <div>{carnPlants.unitPrice}</div>
// // )}
//
// export default Plants
