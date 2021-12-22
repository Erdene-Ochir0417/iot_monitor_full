import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import cpuIcon from '@iconify/icons-whh/cpu';
import * as React from 'react';

// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Grid
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
import Service from '../service/Service';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Нэр', alignRight: false },
  { id: 'type', label: 'Төрөл', alignRight: false },
  { id: 'sensorCount', label: 'Мэдрүүрийн тоо', alignRight: false },
  { id: 'sendSec', label: 'Илгээх хугацаа', alignRight: false },
  { id: 'status', label: 'Төлөв', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

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

function applySortFilter(array, comparator, query) {
  console.log(array);
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Device() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [data, setData] = React.useState([]);
  const [values, setValues] = React.useState({});

  useEffect(() => {
    new Service()
      .getDevice()
      .then((res) => {
        console.log('device', res.data);
        setData(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('submit', values);
    new Service()
      .addDevice(values)
      .then((res) => {
        setData([...data, res.data]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    console.log(event.target.value);
    setFilterName(event.target.value);
  };

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const filteredUsers = applySortFilter(data, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Төхөөрөмжүүд">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Төхөөрөмжүүд
          </Typography>
          <div>
            <Button
              variant="contained"
              component={RouterLink}
              onClick={handleClickOpen}
              to="#"
              startIcon={<Icon icon={plusFill} />}
              color="primary"
            >
              Төхөөрөмж нэмэх
            </Button>
            <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={open} onClose={handleClose}>
              <DialogTitle>Нэмэх</DialogTitle>
              <DialogContent>
                <DialogContentText> Төхөөрөмжийн нарийн мэдээллийг оруулна уу. </DialogContentText>
                <Box
                  noValidate
                  component="form"
                  sx={{
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    m: 'auto',
                    width: 'fit-content'
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="outlined-basic"
                        name="name"
                        onChange={onChange}
                        label="нэр"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="type"
                        onChange={onChange}
                        id="outlined-basic"
                        label="төрөл"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="outlined-basic"
                        name="sendSecond"
                        onChange={onChange}
                        label="илгээх секунд"
                        variant="outlined"
                      />
                    </Grid>
                    <Button onClick={handleSubmit} fullWidth variant="contained">
                      Нэмэх
                    </Button>
                  </Grid>
                </Box>
              </DialogContent>
              {/* <DialogActions>
                
              </DialogActions> */}
            </Dialog>
          </div>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={data.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name, type, status, sensorCount, sendSecond } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          // role="checkbox"
                          onClick={() => {}}
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, name)}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            padding="none"
                            onClick={() => {
                              navigate(`${id}`);
                            }}
                          >
                            <Stack direction="row" alignItems="center" spacing={2}>
                              {/* <Avatar alt={name} src={avatarUrl} /> */}
                              <Icon icon={cpuIcon} width="36" height="36" />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{type}</TableCell>
                          <TableCell align="left">{sensorCount}</TableCell>
                          <TableCell align="left">{sendSecond}</TableCell>

                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={(status === false && 'error') || 'success'}
                            >
                              {/* {sentenceCase(status)} */}
                              {(status === false && 'Идэвхгүй') || 'Идэвхтэй'}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <UserMoreMenu />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}