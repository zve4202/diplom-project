import React from "react";
import PropTypes from "prop-types";
import Quantity from "./quantity";
import Reminder from "./reminder";

const QuantityReminder = ({ data }) => {
    const { count } = data;
    if (count > 0) {
        return <Quantity data={data} />;
    } else {
        return <Reminder data={data} />;
    }
};

QuantityReminder.propTypes = {
    data: PropTypes.object.isRequired
};

export default QuantityReminder;
