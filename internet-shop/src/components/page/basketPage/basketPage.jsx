import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import BasketSidebar from "./basketSidebar";
import BasketTable from "./table/basketTable";
import {
    applyBasket,
    checkBasket,
    loadBasketItems
} from "../../../store/basket";
import WorkScreen from "../../common/wrappers/workScreen";
import menu from "./menu";
import ContentWrapper from "../../common/wrappers/content";
import ApplyForm from "./applyForm/applyForm";

const BasketPage = () => {
    const { step } = useParams();
    const [stepType, setStepType] = useState(
        !step ? "show" : step === "check" ? step : "apply"
    );

    const dispatch = useDispatch();

    const { productsLoading, data } = useSelector((state) => state.basket);

    const { products, _id } = data;
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
        if (data.status === "basket" && stepType === "check") {
            dispatch(checkBasket());
        }
        if (data.status === "checked" && stepType === "apply") {
            dispatch(applyBasket());
        }
    }, [stepType, data.status]);
    const handleCheckAndPay = () => {
        if (data.status === "basket") {
            setStepType("check");
        } else if (data.status === "checked") {
            setStepType("apply");
        }
    };

    return (
        <WorkScreen>
            <BasketSidebar menu={menu} onCheckAndPay={handleCheckAndPay} />
            <ContentWrapper menu={menu.caption}>
                <ApplyForm step={stepType} />
                <BasketTable
                    name={menu.name}
                    data={products || []}
                    loading={productsLoading}
                    onReload={handleReload}
                    readOnly={data.status === "checked"}
                />
            </ContentWrapper>
        </WorkScreen>
    );
};

export default BasketPage;
