import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import history from "../../../utils/history";

import { getBasket, clearBasket, disassemble } from "../../../store/basket";
import SideBarWrapper from "../../common/wrappers/sideBar";
import BackButton from "../../common/backButton";
// import { yesNo } from "../../../dialogs/messageDialog";
// import { names } from "./menu";
import UndoBasketButton from "./undoBasketButton";
import ApplyBasketButton from "./applyBasketButton";
import BasketTotals from "./basketTotals";
import PayForm from "./payForm/payForm";

const BasketSidebar = ({ menu, onCheckAndPay }) => {
    const basket = useSelector(getBasket());
    const dispatch = useDispatch();

    // const nf = Intl.NumberFormat();

    const handleUndoBasket = (todo) => {
        if (todo === "clear") {
            dispatch(clearBasket());
            setTimeout(() => {
                if (history.location.pathname.includes("basket")) {
                    history.push("/");
                }
            }, [3000]);
        } else {
            dispatch(disassemble());
            onCheckAndPay(todo);
        }
    };

    return (
        <SideBarWrapper
            {...{
                menu,
                backBtn: <BackButton to="/" tooltip="Вернуться к покупкам" />
            }}
        >
            {basket.totalQty > 0 && (
                <div>
                    <BasketTotals basket={basket} />
                    <UndoBasketButton
                        status={basket.status}
                        onAccept={handleUndoBasket}
                    />
                    <ApplyBasketButton onAccept={onCheckAndPay} />
                    <PayForm className="mt-3" />
                </div>
            )}
        </SideBarWrapper>
    );
};

BasketSidebar.propTypes = {
    menu: PropTypes.object.isRequired,
    onCheckAndPay: PropTypes.func.isRequired
};

export default BasketSidebar;
