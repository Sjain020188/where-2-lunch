import { fireEvent, render, waitForElementToBeRemoved, screen } from './test-utils';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import restaurantsMock from '../../Data/restaurants.json';
import detailsMock from '../../Data/photos.json';
import axios from 'axios';
import { getRecommendedRestaurant } from '../../Services/utils';

jest.mock('axios');
jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}));

// NOTE: getRecommendedRestaurant should be mocked.
const recommended = getRecommendedRestaurant(restaurantsMock.results);
const SearchTerm = 'BrewDog Roppongi';

describe('Recommendation Component', () => {
  const history = createMemoryHistory();

  beforeEach(async () => {
    await act(async () => {
      (axios as jest.Mocked<typeof axios>).get.mockImplementation((url: string) => {
        if (url && url.includes('categories')) {
          return Promise.resolve({ data: restaurantsMock });
        }
        if (url && url.includes('photos')) {
          return Promise.resolve({ data: detailsMock['4b5d19f8f964a520b05229e3'].photos });
        }

        return Promise.resolve({ data: detailsMock['4b5d19f8f964a520b05229e3'].tips });
      });
       render(
        <MemoryRouter initialEntries={['/recommendation']}>
          <App />
        </MemoryRouter>
      );
    });
  });

  afterEach(() => jest.resetAllMocks());

  test('it should have heading', () => {
    const heading = screen.getByText(/Here is the lunch recommendation for today?/i);
    expect(heading).toBeInTheDocument();
  });

  test('it should have recommended item', () => {
    const recommendedRestaurantName = screen.getByText(recommended.name);
    expect(recommendedRestaurantName).toBeInTheDocument();
  });

  test('it should have search link', () => {
    const search = screen.getByText(/Click Here to Search all Restaurants?/i);
    expect(search).toBeInTheDocument();
  });

  test('it should display text search area on clicking the search link and all restaurants', async () => {
    await act(async () => {
      const searchArea = screen.queryByRole('textbox');
      expect(searchArea).not.toBeInTheDocument();
      const search = screen.getByText(/Click Here to Search all Restaurants?/i);
      fireEvent.click(search);
    });
    const textArea = screen.getByRole('textbox');
    expect(textArea).toBeInTheDocument();
    restaurantsMock.results.forEach((restaurant) => {
      const name = screen.getAllByText(restaurant.name);
      if (restaurant.name === recommended.name) {
        // recommended item is displayed twice. One on top and one in the list
        expect(name).toHaveLength(2);
      } else {
        expect(name).toHaveLength(1);
      }
    });
  });

  test('it should display restaurants based on search criteria', async () => {
    await act(async () => {
      const search = screen.getByText(/Click Here to Search all Restaurants?/i);
      await fireEvent.click(search);
      await waitForElementToBeRemoved(screen.queryAllByText(/Loading...../i)).catch(err =>
        console.log(err),
      )
      const textArea = screen.getByRole('textbox');
      fireEvent.change(textArea, { target: { value: SearchTerm } });
    });
    const toBeDisplayed = restaurantsMock.results.filter(
      (result) => result.name === SearchTerm || result.name === recommended.name
    );
    const notBeDisplayed = restaurantsMock.results.filter(
      (result) => result.name !== SearchTerm && result.name !== recommended.name
    );

    notBeDisplayed.forEach((restaurant) => {
      const name = screen.queryByText(restaurant.name);
      expect(name).not.toBeInTheDocument();
    });
    toBeDisplayed.forEach((restaurant) => {
      const name = screen.getAllByText(restaurant.name)[0];
      expect(name).toBeInTheDocument();
    });
  });

  test('it should go to details page on clicking learn more', async () => {
    await act(async () => {
      //  await waitForElementToBeRemoved(screen.queryAllByText(/Loading...../i)).catch(err =>
      //   console.log(err),
      // )
      const learnMore = screen.getByText(/Learn More?/i);
      await fireEvent.click(learnMore);
    });
    const detailsPage = screen.queryByText('Overview');
    expect(detailsPage).toBeInTheDocument();
  });
});
