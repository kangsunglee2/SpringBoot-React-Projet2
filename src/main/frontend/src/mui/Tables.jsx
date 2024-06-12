import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import axios from 'axios';
import { Collapse, TableHead, Typography } from '@mui/material';



function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(id, uname, email, regDate, github, insta, location) {
  return { 
    id, uname, email, regDate, github, insta, location,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

export default function CustomPaginationActionsTable(props) {
  const { row } = props;
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('/rp/react/list')
      .then(res => {
        setList(res.data)
        setIsLoading(false);
      })
      .catch(err => console.log(err))
  }, []);

  const rows = 
  list.map((x, y) => (
    createData(x.uid, x.uname, x.email, x.regDate, x.github, x.insta, x.location)
  )
).sort((a, b) => (a.calories < b.calories ? -1 : 1));

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [openRows, setOpenRows] = useState([]); 
  const toggleRow = (index) => { 
    setOpenRows(prevOpenRows => {
      const isOpen = prevOpenRows[index];
      const updatedOpenRows = [...prevOpenRows];
      updatedOpenRows[index] = !isOpen;
      return updatedOpenRows;
    });
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 10, marginBottom: 10 }}>
    <TableContainer component={Paper} style={{ width: 800, backgroundColor: '#f5f5f5' }}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', fontSize: 15 }}>아이디</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: 15 }}>이름</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: 15 }}>이메일</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: 15 }}>생성날짜</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row, index) => (
            <Row
              key={row.id}
              row={row}
              isOpen={openRows[index]} // 해당 게시글의 open 상태를 전달
              toggleRow={() => toggleRow(index)} // 해당 게시글을 토글하는 함수 전달
            />
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20, 25, { label: 'All', value: -1 }]}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
              labelRowsPerPage="게시글수"
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  </Box>
);
}


function Row({ row, isOpen, toggleRow }) {
  return (
    <>
      {/* 각 게시글의 첫 번째 행 */}
      <TableRow
        sx={{ '& > *': { borderBottom: 'unset' } }}
        aria-label="expand row"
        size="small"
        onClick={toggleRow} // 클릭 시 toggleRow 함수 호출
      >
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell>{row.uname}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.regDate}</TableCell>
        
      </TableRow>
      {/* 해당 게시글의 두 번째 행 (펼쳐질 내용) */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                상세정보
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>깃허브</TableCell>
                    <TableCell>인스타</TableCell>
                    <TableCell align="right">주소</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{row.github}</TableCell>
                    <TableCell>{row.insta}</TableCell>
                    <TableCell align="right">{row.location}</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}