import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import RestaurantImageList from '../Components/RestaurantImageList';
import { RestaurantTipList } from '../Components/RestaurantTipList';
import { MapboxMap } from '../Components/MapboxMap';
import { TabsPanel } from '../Components/TabsPanel';
import { useRestaurants } from '../Hooks/useRestaurants';
import { Restaurant } from '../Types/ApiData';
import { DetailsTable } from '../Components/DetailsTable';
import { Error } from '../Components/Error';
import { Loading } from '../Components/Loading';

/* -------------------------------------------------------------------------- */
/*                              Component                                     */
/* -------------------------------------------------------------------------- */

/**
 * This component is used to render details of restaurant
 *
 */
export function Details() {
  const params = useParams();
  const { restaurants, loading, error } = useRestaurants();

  if (loading) {
    return <Loading />;
  }

  if (error.length > 0) {
    return <Error msg={error} />;
  }

  const item = restaurants.find((item) => item.fsq_id === params.id);

  if (item) {
    return (
      <S.Div.Container>
        <S.Div.Header>
          <MapboxMap lat={item.geocodes.main.latitude} lng={item.geocodes.main.longitude} />
          <S.Div.RightContainer>
            <h1>{item.name}</h1>
            <DetailsTable details={getRestaurantDetails(item)} />
          </S.Div.RightContainer>
        </S.Div.Header>
        <TabsPanel tabsInfo={getTabsInfo(item)} />
      </S.Div.Container>
    );
  }
  return <p>No Item found</p>;
}

/* -------------------------------------------------------------------------- */
/*                              Utility Functions                             */
/* -------------------------------------------------------------------------- */

//NOTE: Overview has dummy text
function getTabsInfo(item: Restaurant) {
  return [
    {
      index: 0,
      value: 'Overview',
      children: (
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industrys standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
          Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </p>
      )
    },
    {
      index: 1,
      value: 'Photos',
      children: <RestaurantImageList images={item.photos} />
    },
    {
      index: 2,
      value: 'Reviews',
      children: <RestaurantTipList />
    }
  ];
}

function getRestaurantDetails(item: Restaurant) {
  return {
    address: item.location.formatted_address,
    categories: item.categories.map((category) => category.name).join(','),
    ...(item.location.neighborhood && { neighborhood: item.location.neighborhood[0] })
  };
}

/* -------------------------------------------------------------------------- */
/*                              Styles                                        */
/* -------------------------------------------------------------------------- */

const S = {
  Div: {
    Header: styled.div`
      display: flex;
      flex-direction: row;
      text-align: left;
    `,
    RightContainer: styled.div`
      margin-left: 10px;
    `,
    Container: styled.div`
      padding: 20px;
    `
  }
};
