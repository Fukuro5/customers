import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import { productDataSelector } from '@/services/selectors/products'
import { addProducts } from '@/services/actions/products'
import { Header } from '@/components/index'
import st from './styles.scss'

const selector = createSelector(
  productDataSelector,
  (product) => ({
    product,
  }),
)

class Products extends Component {
  render() {
    return (
      <>
      <Header />
      <div className={st.container}>
        <div className={st.head}>Product List</div>
        {this.props.product.map((data) => {
          return (
            <div className={st.row} key={data.id}>
              <div className={st.id}>{data.id}</div>
              <div className={st.trContent}>
                <div>
                  <div className={st.name}>{data.name}</div>
                  <div className={st.createdAt}>{data.createdAt}</div>
                  <div className={st.updatedAt}>{data.updatedAt}</div>
                </div>
                <div className={st.price}>{data.price}</div>
              </div>
            </div>
          )
        })}
      </div>
      </>
    )
  }
}

export default connect(selector, {
  addProducts,
})(Products)