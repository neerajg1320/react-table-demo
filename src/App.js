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
  )
}

export default App;
