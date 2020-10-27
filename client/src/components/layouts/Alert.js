import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeAlert } from '../../redux/actions/alertActions';

const Alert = () => {
  const dispatch = useDispatch();
  const alerts = useSelector((state) => state.alert);
  return alerts !== null && alerts.length > 0
    ? alerts.map((alert) => (
        <div
          key={alert.id}
          className={`notification is-${alert.alertType} is-light`}
        >
          <button
            class='delete'
            onClick={() => dispatch(removeAlert(alert.id))}
          ></button>
          {alert.msg}
        </div>
      ))
    : null;
};

export default Alert;
