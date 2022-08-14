import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getAuth } from "../../../../store/auth";

const RoleControl = ({ userId, children }) => {
    const { currentUser, isAdmin } = useSelector(getAuth());

    if (isAdmin && currentUser._id !== userId) {
        return children;
    }
    return null;
};

RoleControl.propTypes = {
    userId: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default RoleControl;
