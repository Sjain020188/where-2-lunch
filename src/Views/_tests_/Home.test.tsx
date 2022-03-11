import { fireEvent, render, screen, waitFor } from './test-utils';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import restaurantsMock from '../../Data/restaurants.json';
import detailsMock from '../../Data/photos.json';

jest.mock('axios');
describe('Home Component', () => {

  const history = createMemoryHistory();
  beforeEach(async() => {
  
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
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
  });

  test('it should have button', () => {
    const linkElement = screen.getByText(/Where 2 lunch today?/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('it should go to next screen on clicking button', async () => {
    await act(async () => {
      const button = screen.getByText(/Where 2 lunch today?/i);
      fireEvent.click(button);
    });
    await waitFor(() => {
     const heading = screen.getByText(/Here is the lunch recommendation for today?/i);
      expect(heading).toBeInTheDocument();
    });

  });
});
