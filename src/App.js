import cellEditFactory from "react-bootstrap-table2-editor";
import paginationFactory from "react-bootstrap-table2-paginator";
import "bootstrap/dist/css/bootstrap.min.css";
import { DATA } from "./constants";
import BootStrapTable from "react-bootstrap-table-next";
import { useState } from "react";

function App() {
  const [selected, setSelected] = useState([]);
  const [searchvalue, setsearchvalue] = useState("");
  const [datum, setdatum] = useState(DATA);

  const handleOnSelect = (row, isSelect) => {
    if (isSelect) {
      setSelected([...selected, row.id]);
    } else {
      setSelected(selected.filter((id) => id !== row.id));
    }
  };

  const handleDeleteSelected = () => {
    const updatedData = datum.filter((item) => !selected.includes(item.id));
    setdatum(updatedData);
    setSelected([]);
  };
  const selectRow = {
    mode: "checkbox",
    onSelect: handleOnSelect,
    selected: selected,
  };
  //slection
  function handleSearch() {
    console.log(searchvalue);
    const filtered = datum.filter(
      (item) =>
        item.name.toLowerCase().includes(searchvalue) ||
        item.email.toLowerCase().includes(searchvalue)
    );
    setdatum(filtered);
    if (searchvalue === "") {
      setdatum(DATA);
    }
  }

  const columns = [
    {
      dataField: "id",
      text: "Id",
      sort: "true",
    },
    {
      dataField: "name",
      text: "Name",
      sort: "true",
    },
    {
      dataField: "email",
      text: "Email",
    },
    {
      dataField: "role",
      text: "Role",
      editable: false,
    },
    {
      dataField: "action",
      text: "Action",
      formatter: (cell, row) => {
        return (
          <button
            className="btn btn-secondary"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </button>
        );
      },
    },
  ];
  function handleDelete(id) {
    // console.log(id);
    const deleted = datum.filter((i) => i.id !== id);
    setdatum(deleted);
  }
  return (
    <div className="App">
      <div className=" d-flex justify-content-between align-items-center me-2">
        <div>
          <input
            type="text"
            style={{ borderRadius: "10px", margin: "10px" }}
            placeholder="Search here"
            onChange={(e) => setsearchvalue(e.target.value)}
          />
          <button className=" btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div>
          <button
            className=" btn btn-primary right-0"
            onClick={handleDeleteSelected}
          >
            DeleteSelected
          </button>
        </div>
      </div>

      <BootStrapTable
        data={datum}
        keyField="id"
        columns={columns}
        search
        striped
        hover
        pagination={paginationFactory()}
        cellEdit={cellEditFactory({
          mode: "dbclick",
          blurToSave: true,
          nonEditableRows: () => [1],
        })}
        selectRow={selectRow}
      />
    </div>
  );
}

export default App;
