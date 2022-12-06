import { format } from 'date-fns';
import EditableCell from "../components/common/editableCell";

export const PRESET_COLUMNS = [
  {
    Header: 'Id',
    Footer: 'Id',
    accessor: 'id',
    disableFilters: true,
  },
  {
    Header: 'First Name',
    Footer: 'First Name',
    accessor: 'first_name'
  },
  {
    Header: 'Last Name',
    Footer: 'Last Name',
    accessor: 'last_name'
  },
  {
    Header: 'Date of Birth',
    Footer: 'Date of Birth',
    accessor: 'date_of_birth',
    Cell: ({ value }) => {
      return format(new Date(value), 'dd/MM/yyyy');
    }
  },
  {
    Header: 'Country',
    Footer: 'Country',
    accessor: 'country',
    edit: true,
    bulk: true,
    type: "select",
    choices: [
      "Select",
      "Australia",
      "India",
      "UK",
      "US"
    ],
    defaultChoice: "India"
  },
  {
    Header: 'Phone',
    Footer: 'Phone',
    accessor: 'phone',
    edit: true,
    bulk: true,
    type: "input",
    Cell: EditableCell
  },
  {
    Header: 'Remarks',
    Footer: 'Remarks',
    accessor: 'remarks',
    edit: true,
    bulk: true,
    type: "input",
    Cell: EditableCell
  }
];



export const GROUPED_COLUMNS = [
  {
    Header: 'Id',
    Footer: 'Id',
    accessor: 'id'
  },
  {
    Header: 'Name',
    Footer: 'Name',
    columns: [
      {
        Header: 'First Name',
        Footer: 'First Name',
        accessor: 'first_name'
      },
      {
        Header: 'Last Name',
        Footer: 'Last Name',
        accessor: 'last_name'
      }
    ]
  },
  {
    Header: 'Info',
    Footer: 'Info',
    columns: [
      {
        Header: 'Date of Birth',
        Footer: 'Date of Birth',
        accessor: 'date_of_birth'
      },
      {
        Header: 'Country',
        Footer: 'Country',
        accessor: 'country'
      },
      {
        Header: 'Phone',
        Footer: 'Phone',
        accessor: 'phone'
      }
    ]
  }
];
