import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { createSelector } from 'reselect'
import { customerDataSelector } from '@/services/selectors/customers'
import { addCustomers } from '@/services/actions/customers'
import { productDataSelector } from '@/services/selectors/products'
import { addProducts } from '@/services/actions/products'
import { invoiceDataSelector } from '@/services/selectors/invoice'
import { addInvoice, invoiceChange } from '@/services/actions/invoice'
import { invoiceItemsDataSelector } from '@/services/selectors/invoiceItems'
import { addInvoiceItems, loadInvoicesItems, changeProductQuantity, deleteInvoiceItems } from '@/services/actions/invoiceItems'
import { Header } from '@/components/index'
import { LoaderSvg } from '@/assets/icons/index'
import st from './styles.scss'

const selector = createSelector(
  customerDataSelector,
  productDataSelector,
  invoiceDataSelector,
  invoiceItemsDataSelector,
  (customer, product, invoice, invoiceItems) => ({
    customer,
    product,
    invoice,
    invoiceItems,
  }),
)

class Edit extends Component {
  state = {
    id: null,
    isFetching: false
  }

  componentDidMount() {
    if(this.props.product.length == 0) {
      axios.get('/customers')
      .then(res => {
        this.props.addCustomers(res.data)
      })
      axios.get('/products')
      .then(res => {
        this.props.addProducts(res.data)
      })
    }

    let data

    axios.get(`invoices/${this.props.match.params.id}/items`)
    .then(res => {
      res.data.map(item => {
        axios.get(`/products/${item.product_id}`)
        .then(prod => {
          data = {
            id: prod.data.id,
            name: prod.data.name,
            price: prod.data.price,
            quantity: item.quantity
          }
          this.props.loadInvoicesItems(data)
        })
      })
    })
  }

  productAdd = () => {
    let products = {
      id: null,
      name: null,
      price: null,
      quantity: 1
    }
    this.props.changeProductQuantity([])
    axios.get(`invoices/${this.props.match.params.id}/items`)
    .then(res => {
      res.data.map(item => {
        axios.get(`/products/${item.product_id}`)
        .then(prod => {
          products = {
            id: prod.data.id,
            name: prod.data.name,
            price: prod.data.price,
            quantity: item.quantity
          }
          this.props.addInvoiceItems(products)
        })
      })
    })
  }

  productChange = (event) => {
    this.setState({
      id: event.target.value
    })
  }

  productSubmit = (e) => {
    e.preventDefault();
    this.setState({isFetching: true})
    const currentProduct = this.props.product.find(prod => prod.id == this.state.id)
    axios.post(`invoices/${this.props.match.params.id}/items`, {
      invoice_id: this.props.match.params.id,
      product_id: currentProduct.id,
      quantity: 1
    }).then(() => {
      this.productAdd();
      this.setState({isFetching: false})
    })
    
    // console.log(a)
    // this.props.product.map((el) => {
    //   if(el.id == this.state.id) {
    //     axios.post(`invoices/${this.props.match.params.id}/items`, {
    //       invoice_id: this.props.match.params.id,
    //       product_id: el.id,
    //       quantity: 1
    //     })
    //     .then(() => {
    //       this.productAdd()
    //     })
    //   }
    // })
    // this.productAdd()
  }

  deleteProduct = (e, i) => {
    e.preventDefault()
    axios.get(`invoices/${this.props.match.params.id}/items`)
      .then(res => {
        res.data.forEach(el => {
          if(el.product_id == i) axios.delete(`invoices/${this.props.match.params.id}/items/${el.id}`)
        })
      })
    this.props.deleteInvoiceItems(i)
  }

  onDiscountChange = (e) => {
    const arr = this.props.invoice.data
    arr.forEach((data) => {
      if(data.id == this.props.match.params.id) {
        data.discount = +e.target.value
      }
    })
    this.props.invoiceChange(arr)
  }

  onCustomerChange = (e) => {
    axios.put(`invoices/${this.props.match.params.id}`, {
      customer_id: e.target.value
    })
    const arr = this.props.invoice.data
    arr.forEach((data) => {
      if(data.id == this.props.match.params.id) {
        data.customer_id = +e.target.value
      }
    })
    this.props.invoiceChange(arr)
  }

  onTotalChange = (e) => {
    const arr = this.props.invoice.data
    arr.forEach((data) => {
      if(data.id == this.props.match.params.id) {
        data.total = +e
      }
    })
    this.props.invoiceChange(arr)
  }

  onQuantityChange = (e, i, id) => {
    const arr = this.props.invoiceItems.data;
    arr[i] = {
      ...arr[i],
      quantity: +e.target.value
    }
    this.props.changeProductQuantity(arr)
 
    const value = e.target.value
    axios.get(`invoices/${this.props.match.params.id}/items`)
      .then(res => {
        res.data.forEach(item => {
          if(item.product_id == id) {
            axios.put(`invoices/${this.props.match.params.id}/items/${item.id}`, {
              quantity: value
            })
          }
        })
    })
  }

  render() {
    axios.put(`invoices/${this.props.match.params.id}`, {
      total: this.props.invoiceItems.total
    })

    let disc
    this.props.invoice.data.forEach((data) => {
      if(data.id == this.props.match.params.id){
        disc = data.discount
      }
    })

    return (
      <>
        <Header />
        <section className={st.container}>
          <div className={st.head}>Edit Invoice</div>
          {/* <form onSubmit={this.productSubmit}> */}
            <label>Discount(%)<input className={st.inDisc} defaultValue={disc} type='text' onChange={this.onDiscountChange} /></label>
            <div className={st.subtitle}>Customer</div>
            <select className={st.choose} onChange={this.onCustomerChange}>
              {this.props.customer.map((data) => {
                return (
                  <option key={data.name} className={st.op} value={data.id}>{data.name}</option>
                )
              })}
            </select>
            <div className={st.subtitle}>Add product</div>
            <div className={st.addBlock}>
              <select className={st.choose} onChange={this.productChange}>
                <option disabled>Select...</option>
                {this.props.product.map((data,i) => {
                  return (
                    <option key={`${data.id}_${i}`} value={data.id}>{data.name}</option>
                  )
                })}
              </select>
              {this.state.isFetching ? <div className={st.loader}><LoaderSvg /></div> : <button onClick={this.productSubmit} className={st.add}>Add</button>}
            </div>
            <table className={st.listShop}>
              <tbody>
                <tr>
                  <th id={st.name}>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th></th>
                </tr>
                {this.props.invoiceItems.data.map((data, i) => {
                  return (
                    <tr key={`${data.id}_${i}`}>
                      <td>{data.name}</td>
                      <td>{data.price}</td>
                      <td><input value={data.quantity} onChange={(e) => this.onQuantityChange(e, i, data.id)} /></td>
                      <td><button className={st.delete} onClick={e => this.deleteProduct(e, data.id)}>Delete</button></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className={st.total}>
              Total: {(this.props.invoiceItems.total).toFixed(2)}
            </div>
          {/* </form> */}
        </section>
      </>
    )
  }
}

const EditWithRouter = withRouter(Edit)

export default connect(selector, {
  addCustomers,
  addProducts,
  addInvoice,
  invoiceChange,
  addInvoiceItems,
  loadInvoicesItems,
  changeProductQuantity,
  deleteInvoiceItems,
})(EditWithRouter)