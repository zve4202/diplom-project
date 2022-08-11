import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import BasketLoader from "./basketLoader";
import BasketSidebar from "./basketSidebar";
import BasketTable from "./table/basketTable";
import { loadBasket } from "../../../store/basket";
import WorkScreen from "../../common/wrappers/workScreen";

const BasketPage = () => {
    const name = "basket";
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadBasket());
    }, []);

    const { isLoading, error, basket } = useSelector((state) => state.basket);
    const { products, docs } = basket;

    const entities =
        isLoading || !products
            ? []
            : docs.map((doc) => {
                  const prod = products.find((prod) => prod._id === doc.id);
                  if (prod) return { ...prod, qty: doc.qty, price: doc.price };
                  return doc;
              });

    const handleSort = () => {};
    const handleReload = () => {
        // dispatch(loadBasket());
    };

    return (
        <WorkScreen>
            <BasketSidebar />
            <div className="content_wrapper card bg-light p-2">
                <div className="card">
                    <div className="card-header">
                        <i className="bi bi-cart-check me-2" />
                        КОРЗИНА
                    </div>

                    <div className="px-2 h-100">
                        <BasketLoader
                            isLoading={isLoading}
                            error={error}
                            length={entities?.length}
                        >
                            <BasketTable
                                name={name}
                                products={entities}
                                onSort={handleSort}
                                onUpdate={handleReload}
                            />
                        </BasketLoader>
                    </div>
                </div>
            </div>
        </WorkScreen>
    );
};

export default BasketPage;
