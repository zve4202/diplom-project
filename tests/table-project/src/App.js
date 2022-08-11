import "./App.css";
import "./App.scss";
import FullDemo from "./components/FullDemo";

// import React, { useEffect } from "react";
// import { getTableUtils, Table } from "react-select-table";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";

// import { tableNamespace } from "./store";

// const columns = [
//   {
//     title: "A/I",
//     defaultWidth: 10,
//   },
//   {
//     title: "Id",
//     path: "id",
//     isHeader: true,
//     defaultWidth: 10,
//   },
//   {
//     title: "Title",
//     path: "title",
//     defaultWidth: 50,
//   },
//   {
//     title: "Completed",
//     path: "completed",
//     defaultWidth: 20,
//     render: (completed, todo, options) => {
//       options.className = completed ? "text-green" : "text-red";
//       return <FontAwesomeIcon icon={completed ? faCheck : faXmark} />;
//     },
//   },
// ];

// const { hooks } = getTableUtils(tableNamespace);

export default function App() {
    // const actions = hooks.useActions();

    // useEffect(() => {
    //   actions.startLoading();
    //   axios
    //     .get("https://jsonplaceholder.typicode.com/todos")
    //     .then((response) => actions.setItems(response.data))
    //     .catch(() => actions.setError("Something went wrong"));
    // }, [actions]);
    return (
        <div className="App">
            <FullDemo />
            {/* <Table columns={columns} namespace={tableNamespace} /> */}
        </div>
    );
}
