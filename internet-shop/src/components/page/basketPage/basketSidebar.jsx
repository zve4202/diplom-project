import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import history from "../../../utils/history";

import { getBasket, clearBasket } from "../../../store/basket";
import SideBarWrapper from "../../common/wrappers/sideBar";
import BackButton from "../../common/backButton";
// import { yesNo } from "../../../dialogs/messageDialog";
// import { names } from "./menu";
import ClearBasketButton from "./clearBasketButton";
import GoToPayButton from "./goToPayButton";
import BasketTotals from "./basketTotals";

const BasketSidebar = ({ menu, step, onCheckAndPay }) => {
    const basket = useSelector(getBasket());
    const dispatch = useDispatch();

    // const nf = Intl.NumberFormat();

    const handleClearBasket = () => {
        dispatch(clearBasket());
        setTimeout(() => {
            if (history.location.pathname.includes("basket")) {
                history.push("/");
            }
        }, [3000]);
    };

    // const onItemSelect = (item) => {
    //     switch (item.path) {
    //         case names.clear:
    //             yesNo("Вы действительно желаете очистить вашу корзину?", handleClearBasket);
    //             break;
    //         case names.goto:
    // yesNo(
    //     "Вы действительно желаете отправить корзину на проверку, и перейти к оплате?",
    //     handleCheckAndPay
    // );
    // break;
    //         default:
    //             break;
    //     }
    // };

    return (
        <SideBarWrapper
            {...{
                menu,
                // onItemSelect,
                // menuAfterChildren: true,
                backBtn: <BackButton to="/" tooltip="Вернуться к покупкам" />
            }}
        >
            {basket.totalQty > 0 && (
                <div>
                    <BasketTotals basket={basket} />
                    <ClearBasketButton
                        status={basket.status}
                        onAccept={handleClearBasket}
                    />
                    <GoToPayButton step={step} onAccept={onCheckAndPay} />
                </div>
            )}
        </SideBarWrapper>
    );
};

BasketSidebar.propTypes = {
    step: PropTypes.string.isRequired,
    menu: PropTypes.object.isRequired,
    onCheckAndPay: PropTypes.func.isRequired
};

export default BasketSidebar;
