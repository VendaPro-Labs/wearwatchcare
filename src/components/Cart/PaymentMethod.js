import React from 'react';
import PropTypes from 'prop-types';

import { connect } from "react-redux";

import Other from "../../assets/paymentMethods/Other.jpg";
import Visa from "../../assets/paymentMethods/Visa.jpg";
import Mastercard from "../../assets/paymentMethods/Mastercard.jpg";
import AmericanExpress from "../../assets/paymentMethods/American Express.jpg";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";

import CheckIcon from "@material-ui/icons/Check";
import SquareMethod from './SquareMethod';



const PaymentMethodBadge = withStyles(() => ({
  badge: {
    backgroundColor: "var(--black)",
    color: "var(--white)",
    borderRadius: "50%",
    height: "25px",
    width: "25px",
    padding: "5px",
  },
}))(Badge);



export const PaymentMethod = ( {squareEnv, squarePayment}) => {
  const paymentMethods = [
    {
      name: "Visa",
      logo: Visa,
    },
    {
      name: "Mastercard",
      logo: Mastercard,
    },
    {
      name: "American Express",
      logo: AmericanExpress,
    },
    {
      name: "Other",
      logo: Other,
    },
  ];


  return (
    <Row className="paymentMethodSection" noGutters={true}>
      <Col sm={4} className="sectionTitle">
        Payment method:{" "}
      </Col>
      <Col sm={8}>
        <div className="paymentMethodsWrapper">
          {paymentMethods.map((payment) => (
            <div key={payment.name}>
              <PaymentMethodBadge
                showZero={true}
                badgeContent={<CheckIcon className="paymentMethodBadgeIcon" />}
              >
                <img
                  className="paymentMethodLogo"
                  src={payment.logo}
                  alt={payment.name}
                />
              </PaymentMethodBadge>
            </div>
          ))}

          <SquareMethod ></SquareMethod>
        </div>

        <div className="paymentMethodsWrapper">
        </div>

      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
      squareEnv: state.squareReducer.squareEnv,
  };
}

const mapDispatchToProps = {};



export default connect(mapStateToProps)(PaymentMethod);

PaymentMethod.propTypes = {
    dispatch: PropTypes.func.isRequired,
    squareEnv: PropTypes.object.isRequired,
}