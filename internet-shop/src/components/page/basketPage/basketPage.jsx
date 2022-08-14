import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import BasketSidebar from "./basketSidebar";
import BasketTable from "./table/basketTable";
import { loadBasket } from "../../../store/basket";
import WorkScreen from "../../common/wrappers/workScreen";
import menu from "./menu";
import ContentWrapper from "../../common/wrappers/content";

const BasketPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadBasket());
    }, []);

    const { isLoading, basket } = useSelector((state) => state.basket);
    const { products, docs } = basket;

    const entities =
        isLoading || !products
            ? []
            : docs.map((doc) => {
                  const prod = products.find((prod) => prod._id === doc.id);
                  if (prod) return { ...prod, qty: doc.qty, price: doc.price };
                  return doc;
              });

    const handleReload = () => {
        dispatch(loadBasket());
    };

    return (
        <WorkScreen>
            <BasketSidebar menu={menu} />
            <ContentWrapper menu={menu.caption}>
                <BasketTable
                    name={menu.name}
                    data={entities}
                    loading={isLoading}
                    onReload={handleReload}
                />
            </ContentWrapper>
        </WorkScreen>
    );
};

export default BasketPage;
