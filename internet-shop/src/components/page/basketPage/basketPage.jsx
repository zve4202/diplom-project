import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import BasketSidebar from "./basketSidebar";
import BasketTable from "./table/basketTable";
import { loadBasketItems } from "../../../store/basket";
import WorkScreen from "../../common/wrappers/workScreen";
import menu from "./menu";
import ContentWrapper from "../../common/wrappers/content";

const BasketPage = () => {
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

    return (
        <WorkScreen>
            <BasketSidebar menu={menu} />
            <ContentWrapper menu={menu.caption}>
                <BasketTable
                    name={menu.name}
                    data={products || []}
                    loading={productsLoading}
                    onReload={handleReload}
                />
            </ContentWrapper>
        </WorkScreen>
    );
};

export default BasketPage;
