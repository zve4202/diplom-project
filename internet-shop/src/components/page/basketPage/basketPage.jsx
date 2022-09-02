import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import BasketSidebar from "./basketSidebar";
import BasketTable from "./table/basketTable";
import {
    applyBasket,
    checkBasket,
    loadBasketItems,
    payOrder
} from "../../../store/basket";
import WorkScreen from "../../common/wrappers/workScreen";
import menu from "./menu";
import ContentWrapper from "../../common/wrappers/content";
import ApplyForm from "./applyForm/applyForm";

const BasketPage = () => {
    let step;
    const dispatch = useDispatch();

    const { productsLoading, data } = useSelector((state) => state.basket);
    const { products, _id } = data;

    switch (data.status) {
        case "basket":
            step = "show";
            break;
        case "checked":
            step = "check";
            break;
        case "needpay":
            step = "needpay";
            break;
        default:
            step = "undoCheck";
            break;
    }

    const [stepName, setStepName] = useState(step);

    useEffect(() => {
        if (_id) {
            dispatch(loadBasketItems(_id));
        }
    }, [_id]);

    const handleReload = () => {
        if (_id) {
            dispatch(loadBasketItems(_id));
        }
    };

    useEffect(() => {
        if (data.status === "basket" && stepName === "check") {
            dispatch(checkBasket());
        }
        if (data.status === "checked" && stepName === "apply") {
            dispatch(applyBasket());
        }
        if (data.status === "needpay" && stepName === "topay") {
            dispatch(payOrder());
        }
    }, [stepName, data.status]);

    const handleCheckAndPay = (todo) => {
        setStepName(todo);
    };

    return (
        <WorkScreen>
            <BasketSidebar
                menu={menu}
                step={stepName}
                onCheckAndPay={handleCheckAndPay}
            />
            <ContentWrapper menu={menu.caption}>
                <ApplyForm step={stepName} />
                <BasketTable
                    name={menu.name}
                    data={products || []}
                    loading={productsLoading}
                    onReload={handleReload}
                    readOnly={data.status !== "basket"}
                />
            </ContentWrapper>
        </WorkScreen>
    );
};

export default BasketPage;
