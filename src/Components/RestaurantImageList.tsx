import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

import { Photo } from '../Types/ApiData';

/* -------------------------------------------------------------------------- */
/*                              Types                                         */
/* -------------------------------------------------------------------------- */

type Props = { images?: Photo[] };

/* -------------------------------------------------------------------------- */
/*                              Component                                     */
/* -------------------------------------------------------------------------- */

/**
 * This component is used to render list of restauarnt photos
 *
 */
export default function RestaurantImageList({ images }: Props) {
  if (!images) {
    return <p>No Photos</p>;
  }
  return (
    <ImageList sx={{ width: '100%' }} cols={6}>
      {images.map((image) => (
        <ImageListItem key={image.id} rows={5}>
          <img
            src={`${image.prefix}original${image.suffix}`}
            srcSet={`${image.prefix}original${image.suffix}`}
            alt={image.classifications ? image.classifications[0] : 'food'}
            loading="lazy"
          />
          {image.classifications && (
            <ImageListItemBar
              title={image.classifications[0]}
              subtitle={image.classifications[0]}
            />
          )}
        </ImageListItem>
      ))}
    </ImageList>
  );
}
