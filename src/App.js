import './App.css';
import {BasicTable} from "./components/basic-table/BasicTable";
import {SortingTable} from "./components/sort-table/SortingTable";
import {FilteringTable} from "./components/filter-table/FilteringTable";
import {PaginationTable} from "./components/paginated-table/PaginationTable";
import {RowSelectionTable} from "./components/rows/row-selection/RowSelectionTable";
import {RowDeleteTable} from "./components/rows/row-delete/RowDeleteTable";

function App() {
  return (
    <div>
      {/*<BasicTable />*/}
      {/*<SortingTable />*/}
      {/*<FilteringTable />*/}
      {/*<PaginationTable />*/}
      {/*<RowSelectionTable />*/}
      <RowDeleteTable />
    </div>
  );
}

export default App;
