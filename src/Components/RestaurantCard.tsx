import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';

/* -------------------------------------------------------------------------- */
/*                              Types                                     */
/* -------------------------------------------------------------------------- */

type Props = {
  imgSrc: string;
  name: string;
  desc: string;
  id: string;
};

/* -------------------------------------------------------------------------- */
/*                              Component                                     */
/* -------------------------------------------------------------------------- */

/**
 * This component is used to render card component from material ui
 *
 */
export default function RestaurantCard({ imgSrc, name, desc, id }: Props) {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ maxWidth: 345 }}>
        {imgSrc && <CardMedia component="img" height="140" image={imgSrc} alt={name} />}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {desc}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" component={Link} to={`/details/${id}`}>
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
