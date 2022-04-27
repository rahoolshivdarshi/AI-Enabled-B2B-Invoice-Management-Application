import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react"
import GetData from "../services/GetData"
import Edit from "./Edit"
import Delete from './Delete';
import { Grid, Paper } from "@material-ui/core";
import Create from "./Create"
import AdvancedSearch from './AdvancedSearch';
import Analytics from './Analytics';
import Predict from './Predict'
import Footer from './Footer';
import RefreshIcon from '@material-ui/icons/Refresh';


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {id: "sl_no", label: "Sl No"},
  {id: "business_code", label: "Business Code"},
  {id: "cust_number", label: "Customer Number"},
  {id: "clear_date", label: "Clear Date"},
  {id: "business_year", label: "Business Year"},
  {id: "doc_id", label: "Document Id"},
  {id: "posting_date", label: "Posting Date"},
  {id: "document_create_date", label: "Document Create Date"},
  {id: "due_in_date", label: "Due Date"},
  {id: "invoice_currency", label: "Invoice Currency"},
  {id: "document_type", label: "Document Type"},
  {id: "posting_id", label: "Posting Id"},
  {id: "total_open_amount", label: "Total Open Amount"},
  {id: "baseline_create_date", label: "Baseline Create Date"},
  {id: "cust_payment_terms", label: "Customer Payment Terms"},
  {id: "invoice_id", label: "Invoice Id"},
  {id: "aging_bucket", label: "Aging Bucket"}
]

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  
  const createSortHandler = (cellid) => (event) => {
    onRequestSort(event, cellid);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            style={{ color:'#eee'}}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            style={{ color:'#eee' }}
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}


export default function EnhancedTable() {

  const[data, setData] = useState([]);
    useEffect(async () => {
        setData(await GetData())
    }, []);

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState();
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedRow, setSelectedRow] = React.useState([]);
  const [searched, setSearched] = useState("");
  const [searchedRows, setSearchedRows] = useState([]);



  const handleSearch = (e) => {
    const searchedVal = e.target.value.toLowerCase();
    setSearched(searchedVal)
    const filteredRows = data.filter((row) => {
      if (row.cust_number.toString().toLowerCase().includes(searchedVal))
      {
        return row
      }
    });
    setSearchedRows(filteredRows)
  }

  const handleRequestSort = (event, cellid) => {
    const isAsc = orderBy === cellid && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(cellid);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.sl_no);
      setSelected(newSelecteds);
      const newSelectedRows = data.map((n) => n);
      setSelectedRow(newSelectedRows);
      return;
    }
    setSelected([]);
    setSelectedRow([]);
  };


  const handleClick = (event, sl_no, row) => {
    const selectedIndex = selected.indexOf(sl_no);
    let newSelected = [];
    let newSelectedRow = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, sl_no);
      newSelectedRow = newSelectedRow.concat(selectedRow, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      newSelectedRow = newSelectedRow.concat(selectedRow.slice(1));;
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      newSelectedRow = newSelectedRow.concat(selectedRow.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
      newSelectedRow = newSelectedRow.concat(
        selectedRow.slice(0, selectedIndex),
        selectedRow.slice(selectedIndex + 1),
      );
    }

    setSelectedRow(newSelectedRow);
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (updatedData) => setData(updatedData)

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleRefresh = async () => {
      setData(await GetData())
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (

    <div>
      <Paper style={{backgroundColor:'#283d4a', paddingTop: "25px"}} square elevation={24} variant="outlined"> 
          <Grid container md={12} lg={12} spacing={2} style={{paddingLeft: "20px", paddingBottom: "35px"}}>
            <Grid item >
            <Grid container md={12} lg={12}>
            <Grid item > 
              <Predict selectedRow={selectedRow} setData={setData}/>
            </Grid>
            <Grid item >
              <Analytics />
            </Grid>
            <Grid item  > 
              <AdvancedSearch setData={setData}/>
            </Grid>
            <Grid item  > 
            
              <Button
                variant="outlined" color="primary" style={{ color:'#eee'}} onClick={handleRefresh}>
                  <RefreshIcon></RefreshIcon>
              </Button>
            </Grid>
            </Grid>
            </Grid>
            

            <Grid item >
              <TextField
                style={{ height:'55px',backgroundColor:'white',fontSize:'4px', borderRadius:'6px' }}
                onChange={(e) => handleSearch(e)}
                variant="outlined"
                name="searchID"
                placeholder="Search Customer Id"
              />
            </Grid>

            <Grid item >
            <Grid container md={12} lg={12}>
            <Grid item >
              <Create setData={setData}/>
            </Grid>
            <Grid item>
              <Edit numSelected={selected.length} selectedRow={selectedRow} setData={setData}/>
            </Grid>
            <Grid item>
              <Delete numSelected={selected.length} selected={selected} handleDelete={handleDelete} data={data} setData={setData}/>
            </Grid>
            </Grid>
            </Grid>
          
        </Grid>
      
      <div style={{fontSize:"200px" }}>
      
        <TableContainer  
            sx={{ width: '100%', mb: 2 }}>
        
            <Table
              sx={{ width: "max-content" }} 
              size="small"
              aria-labelledby="a dense table"
            >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort((searched === '' ? data : searchedRows), getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((invoice, index) => {
                  const isItemSelected = isSelected(invoice.sl_no);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, invoice.sl_no, invoice)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={invoice.sl_no}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          style={{ color:'#eee'}}
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="left"
                        style={{ color:'#eee'}}
                      >
                        {invoice.sl_no}
                      </TableCell>
                      <TableCell style={{ color:'#eee'}}>{invoice.business_code}</TableCell>
                      <TableCell style={{ color:'#eee'}}>{invoice.cust_number}</TableCell>
                      <TableCell style={{ color:'#eee'}}>{invoice.clear_date}</TableCell>
                      <TableCell style={{ color:'#eee'}}>{invoice.business_year}</TableCell>
                      <TableCell style={{ color:'#eee'}}>{invoice.doc_id}</TableCell>
                      <TableCell style={{ color:'#eee'}}>{invoice.posting_date}</TableCell>
                      <TableCell style={{ color:'#eee'}}>{invoice.document_create_date}</TableCell>
                      <TableCell style={{ color:'#eee'}}>{invoice.due_in_date}</TableCell>
                      <TableCell style={{ color:'#eee'}}>{invoice.invoice_currency}</TableCell>
                      <TableCell style={{ color:'#eee'}}>{invoice.document_type}</TableCell>
                      <TableCell style={{ color:'#eee'}}>{invoice.posting_id}</TableCell>
                      <TableCell style={{ color:'#eee'}}>{invoice.total_open_amount}</TableCell>
                      <TableCell style={{ color:'#eee'}} >{invoice.baseline_create_date}</TableCell>
                      <TableCell style={{ color:'#eee'}}>{invoice.cust_payment_terms}</TableCell>
                      <TableCell style={{ color:'#eee'}}>{invoice.invoice_id}</TableCell> 
                      <TableCell style={{ color:'#eee'}}>{invoice.aging_bucket}</TableCell>                                    
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        </div>
        <TablePagination
          style={{color:'white'}}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={(searched === '' ? data.length : searchedRows.length)}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      </div>
  );
}
