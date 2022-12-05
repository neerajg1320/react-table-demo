import './App.css';
import {BasicTable} from "./components/basic-table/BasicTable";
import {SortingTable} from "./components/sort-table/SortingTable";
import {FilteringTable} from "./components/filter-table/FilteringTable";
import {PaginationTable} from "./components/paginated-table/PaginationTable";
import {RowSelectionTable} from "./components/rows/row-selection/RowSelectionTable";
import {RowDeleteTable} from "./components/rows/row-delete/RowDeleteTable";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function App() {
  return (
      <div style={{display:"flex", justifyContent:"center"}}>
        <div style={{
            width: "80%",
            // border: "1px dashed gray",
            borderRadius: "4px",
            padding: "30px",
            margin: "20px",
            height: "90vh",
            overflow: "scroll",
            // boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
            boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px"
          }}
        >
          <Tabs className="mb-3" defaultActiveKey="basic">
            <Tab eventKey="basic" title="Basic">
              <BasicTable />
            </Tab>
            <Tab eventKey="sorting" title="Sorting">
              <SortingTable />
            </Tab>
            <Tab eventKey="filtering" title="Filtering">
              <FilteringTable />
            </Tab>
            <Tab eventKey="pagination" title="Pagination">
              <PaginationTable />
            </Tab>
            <Tab eventKey="rowSelection" title="Row Selection">
              <RowSelectionTable />
            </Tab>
            <Tab eventKey="rowDelete" title="Row Delete">
              <RowDeleteTable />
            </Tab>
          </Tabs>
        </div>
      </div>
  )
}

export default App;
