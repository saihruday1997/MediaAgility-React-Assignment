import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";
import TablePagination from "@material-ui/core/TablePagination";

export default function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 5;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        "https://api.openweathermap.org/data/2.5/find?lat=17.3850&lon=78.4867&cnt=50&appid=d36e01eaa0ca1ff0b015b52d55b1e9e3"
      );
      let arr = result.data.list;
      arr.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }

        if (a.name > b.name) {
          return 1;
        }

        return 0;
      });

      setData(arr);
    }
    fetchData();
  }, []);

  const useStyles = makeStyles({
    table: {
      minWidth: 650
    }
  });

  const classes = useStyles();

  return (
    <div className="App">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>City name</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Temp current</TableCell>
              <TableCell align="right">Temp min</TableCell>
              <TableCell align="right">Temp max</TableCell>
              <TableCell align="right">Pressure</TableCell>
              <TableCell align="right">Humidity</TableCell>
              <TableCell align="right">Wind speed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((el) => (
                <TableRow key={el.id}>
                  <TableCell component="th" scope="row">
                    {el.name}
                  </TableCell>
                  <TableCell align="right">
                    {el.weather[0].description}
                  </TableCell>
                  <TableCell align="right">{el.main.temp}</TableCell>
                  <TableCell align="right">{el.main.temp_min}</TableCell>
                  <TableCell align="right">{el.main.temp_max}</TableCell>
                  <TableCell align="right">{el.main.pressure}</TableCell>
                  <TableCell align="right">{el.main.humidity}</TableCell>
                  <TableCell align="right">{el.wind.speed}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={50}
          page={page}
          onChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
        />
      </TableContainer>
    </div>
  );
}
