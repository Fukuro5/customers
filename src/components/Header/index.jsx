import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import st from './styles.scss'

class Header extends Component {
  render() {
    return (
      <header className={st.header}>
        <div className={st.content}>
          <div className={st.head}>Invoice App</div>
          <Link to={'/'} className={st.link}>Invoices</Link>
          <Link to={'/products'} className={st.link}>Products</Link>
          <Link to={'/customers'} className={st.link}>Customers</Link>
        </div>
      </header>
    )
  }
}

export default Header