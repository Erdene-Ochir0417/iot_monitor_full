import PropTypes from 'prop-types';
// material
import { Paper, Typography } from '@mui/material';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string
};

export default function SearchNotFound({ searchQuery = '', ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Хайлт амжилтгүй
      </Typography>
      <Typography variant="body2" align="center">
        &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong> энэ үгтэй таарсан хайлт олдсонгүй.
      </Typography>
    </Paper>
  );
}