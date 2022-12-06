import './App.css';
import {BasicTable} from "./components/basic-table/BasicTable";
import {SortingTable} from "./components/sort-table/SortingTable";
import {FilteringTable} from "./components/filter-table/FilteringTable";
import {PaginationTable} from "./components/paginated-table/PaginationTable";
import {RowSelectionTable} from "./components/selection-table/row-selection/RowSelectionTable";
import {RowModifyTable} from "./components/selection-table/row-modify/RowModifyTable";
import {RowModifyFilterTable} from "./components/selection-table/row-modify-filter/RowModifyFilterTable";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {RowModifyFilterIconTable} from "./components/selection-table/row-modify-filtericon/RowModifyFilterIconTable";

function App() {
  return (
      <div style={{display:"flex", justifyContent:"center"}}>
        <div style={{
            width: "90%",
            borderRadius: "4px",
            padding: "30px",
            margin: "20px",
            height: "90vh",
            overflow: "scroll",
            boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px"
          }}
        >
          <Tabs className="mb-3" defaultActiveKey="rowModifyFilterIcon">
            {/*<Tab eventKey="basic" title="Basic">*/}
            {/*  <BasicTable />*/}
            {/*</Tab>*/}
            {/*<Tab eventKey="sorting" title="Sorting">*/}
            {/*  <SortingTable />*/}
            {/*</Tab>*/}
            {/*<Tab eventKey="filtering" title="Filtering">*/}
            {/*  <FilteringTable />*/}
            {/*</Tab>*/}
            {/*<Tab eventKey="pagination" title="Pagination">*/}
            {/*  <PaginationTable />*/}
            {/*</Tab>*/}
            {/*<Tab eventKey="rowSelection" title="Row Selection">*/}
            {/*  <RowSelectionTable />*/}
            {/*</Tab>*/}
            {/*<Tab eventKey="rowModify" title="Row Modify">*/}
            {/*  <RowModifyTable />*/}
            {/*</Tab>*/}
            <Tab eventKey="rowModifyFilter" title="Row Modify Filter">
              <RowModifyFilterTable />
            </Tab>
            <Tab eventKey="rowModifyFilterIcon" title="Row Modify Filter">
              <RowModifyFilterIconTable />
            </Tab>
          </Tabs>
        </div>
      </div>
  )
}

export default App;
