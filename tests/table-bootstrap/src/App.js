import { useEffect, useState } from "react";
import axios from "axios";
import Table from "./components/table/table";
import { Type } from "react-bootstrap-table2-editor";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    await axios("https://jsonplaceholder.typicode.com/comments").then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  };

  const emailFormatter = (data, row) => {
    return <span onClick={() => alert(data)}>email={data}</span>;
  };

  // const headerSortingClasses = (column, sortOrder, isLastSorting, colIndex) =>
  //   sortOrder === "asc" ? "caret-4-asc" : "caret-4-desc";
  const columns = [
    {
      dataField: "email",
      text: "Email",
      sort: true,
      // headerSortingClasses,
      formatter: emailFormatter,
    },
    {
      dataField: "postId",
      text: "Post Id",
      sort: true,
      validator: (newValue, row, column) => {
        if (isNaN(newValue)) {
          return {
            valid: false,
            message: "введите число",
          };
        }
        return true;
      },
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
    },
    // {
    //   dataField: "email",
    //   text: "Dropdown",
    //   sort: true,
    //   editor: {
    //     type: Type.SELECT,
    //     options: [
    //       { value: "a", label: "A" },
    //       { value: "b", label: "B" },
    //     ],
    //   },
    // },
    {
      dataField: "body",
      text: "Body",
      sort: true,
      editable: false,
    },
  ];

  return (
    <div className="App">
      APP
      <Table keyField="id" data={data} columns={columns} bordered={true} />
    </div>
  );
}

export default App;
