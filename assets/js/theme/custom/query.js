import React, {Component} from 'react'
import "../../../custom-css/index.css";


class Query extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
    this.prodQuery = this.prodQuery.bind(this)
  }


    prodQuery(){
      fetch('/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJlYXQiOjE2MDcyOTkyMDAsInN1Yl90eXBlIjoyLCJ0b2tlbl90eXBlIjoxLCJjb3JzIjpbImh0dHBzOi8vbWlrYWVsYXJvZHJpZ3Vlei5jb20iXSwiY2lkIjoxLCJpYXQiOjE1OTI1ODE4NTAsInN1YiI6ImtpNmdxbGI2cW5seWR6ZGUwOWV1Z21jNnBrZnBvejciLCJzaWQiOjk5OTM3OTgyMCwiaXNzIjoiQkMifQ.Wb3hnBjqBonJUOcCnlrGO5GHrewbVzmzWHP0iGWF38Itm43rrSuq-IFat_hUaSrTks1G6mm4QIM1eNXyZKLO9g'
        },
        body: JSON.stringify({
            query: `
            query SingleProduct {
              site {
                product(entityId: 5096) {
                  id
                  entityId
                  description
                  name
                  brand {
                    name
                  }
                  images {
        edges {
          node {
            url320wide: url(width: 320)
            url640wide: url(width: 640)
            url960wide: url(width: 960)
            url1280wide: url(width: 1280)
          }
        }
      }
                  prices {
                    price {
                      value
                      currencyCode
                    }
                  }
                }
              }
            }
             `
        }),
    })
    .then(res => res.json())
    .then(json => this.setState({
      title: json.data.site.product.name,
      price: json.data.site.product.prices.price.value,
      brand: json.data.site.product.brand.name,
      description: json.data.site.product.description,
      image: json.data.site.product.images.edges[0].node.url320wide
    }));    

  }

  componentDidMount() {
    this.prodQuery();
  }

      render () {
          return(
          <div class="container">
          <h1>Mikaela's Store</h1>
          <div class="smaller-container"><h2>{this.state.title}</h2>
          <div><img src={this.state.image}></img></div>
          <div><h4>{this.state.brand}</h4></div>
          <div><h3 id="product-price">{this.state.price}</h3></div>
          <div><h4 id="product-description">{this.state.description}</h4></div>
          </div>
          </div>
          )
      }
    }

    export default Query
