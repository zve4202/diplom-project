import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "./components/table/dataTable";

function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        setLoading(true);
        await axios("https://jsonplaceholder.typicode.com/comments").then(
            (res) => {
                setData(res.data);
            }
        );
        setLoading(false);
    };

    const defaultColumns = [
        {
            key: "id",
            label: "Id",
            fixed: true,
            width: 70
        },
        {
            key: "email",
            label: "Email",
            sortable: true,
            width: 130
        },
        {
            key: "name",
            label: "Name",
            sortable: true,
            width: 250
        },
        {
            key: "body",
            label: "Body",
            sortable: true,
            flexGrow: 1
        },
        {
            key: "postId",
            label: "Post Id",
            sortable: true,
            width: 100
        }
    ];

    return (
        <div style={{ height: "900px", maxHeight: "900px" }}>
            APP
            <DataTable
                keyField="id"
                data={data}
                columns={defaultColumns}
                loading={loading}
            />
        </div>
    );
}

export default App;
