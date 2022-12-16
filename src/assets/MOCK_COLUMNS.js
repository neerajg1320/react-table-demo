import {valToString} from "../utils/types";

export const MOCK_COLUMNS = [
  {
    Header: 'Id',
    Footer: 'Id',
    accessor: 'id',
    key: 'id',
    disableFilters: true,
  },
  {
    Header: 'First Name',
    Footer: 'First Name',
    accessor: 'first_name',
    key: 'first_name'
  },
  {
    Header: 'Last Name',
    Footer: 'Last Name',
    accessor: 'last_name',
    key: 'last_name'
  },
  {
    Header: 'Date of Birth',
    Footer: 'Date of Birth',
    accessor: 'date_of_birth',
    key: 'date_of_birth',
    Cell: ({ value }) => {
      return  valToString(new Date(value));
    }
  },
  {
    Header: 'Country',
    Footer: 'Country',
    accessor: 'country',
    key: 'country',
    edit: true,
    bulk: true,
    type: "select",
    choices: [
      "Select",
      "Australia",
      "India",
      "Indonesia",
      "Netherlands",
      "Chile",
      "Portugal",
      "UK",
      "US"
    ],
    defaultChoice: "India"
  },
  {
    Header: 'Phone',
    Footer: 'Phone',
    accessor: 'phone',
    key: 'phone',
    edit: true,
    bulk: true,
    type: "input",
  },
  {
    Header: 'Remarks',
    Footer: 'Remarks',
    accessor: 'remarks',
    key: 'remarks',
    edit: true,
    bulk: true,
    type: "input"
  }
];

