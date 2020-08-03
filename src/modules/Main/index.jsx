import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { EmailSvg, PhoneSvg } from '@/assets/icons';
import { validationEmail, validationPhone } from '@/utils/validation';
import { Button } from '@/components';
import { createAccount } from '@/services/actions/accounts';
import logoImg from '@/assets/images/logo.png';
import st from './styles.scss';

const selector = createSelector(
  (state) => state.account,
  (account) => ({
    currentUser: account.currentUser,
  }),
);

class Main extends Component {
  static propTypes = {
    createAccount: PropTypes.func.isRequired,
  }

  state = {
    email: '',
    phone: '',
  }

  componentDidMount() {
    this.props.createAccount('Test');
  }

  handleChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  }

  render() {
    const { email, phone } = this.state;

    return (
      <div className={st.page}>
        <img className={st.mainLogo} src={logoImg} alt="logo"/>
        <h1 className={st.mainTitle}>Test</h1>
        <form className={st.mainForm}>
          <div className={st.field}>
            <label htmlFor="email">
              <EmailSvg className={st.icon} />
              Email
            </label>
            <input
              id="email"
              value={email}
              onChange={this.handleChange}
            />
            <span>
              { validationEmail(email) ? 'Valid' : 'Not valid' }
            </span>
          </div>
          <div className={st.field}>
            <label htmlFor="phone">
              <PhoneSvg className={st.icon} />
              phone
            </label>
            <input
              id="phone"
              value={phone}
              onChange={this.handleChange}
            />
            <span>
              { validationPhone(phone) ? 'Valid' : 'Not valid' }
            </span>
          </div>
          <Button className={st.submitBtn}>Submit</Button>
        </form>
      </div>
    );
  }
}

export default connect(selector, {
  createAccount,
})(Main);
