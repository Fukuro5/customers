import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import { customerDataSelector } from '@/services/selectors/customers'
import { addCustomers } from '@/services/actions/customers'
import { config } from '@/utils/API'
import { Header } from '@/components/index'
import st from './styles.scss'

const selector = createSelector(
  customerDataSelector,
  (customer) => ({
    customer,
  }),
)

class Customers extends Component {
  render() {
    return (
      <>
      <Header />
      <div className={st.container}>
        <div className={st.head}>Customer List</div>
          {this.props.customer.map((data) => {
            return (
              <div className={st.row} key={data.id}>
                <div className={st.id}>{data.id}</div>
                <div>
                  <div className={st.name}>{data.name}</div>
                  <div className={st.address}>{data.address}</div>
                  <div className={st.phone}>{data.phone}</div>
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
  addCustomers,
})(Customers)