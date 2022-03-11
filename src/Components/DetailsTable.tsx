import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

/* -------------------------------------------------------------------------- */
/*                              Types                                         */
/* -------------------------------------------------------------------------- */

type Props = {
  details: { [key: string]: string };
};

/* -------------------------------------------------------------------------- */
/*                              Component                                     */
/* -------------------------------------------------------------------------- */

/**
 * This component is used to render table with details
 *
 */
export function DetailsTable({ details }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {Object.keys(details).map((row) => (
            <TableRow key={row} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.toUpperCase()}
              </TableCell>
              <TableCell align="right">{details[row]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
