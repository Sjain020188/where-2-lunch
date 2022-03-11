/**
 * Type definition of data we get from FourSquare places API https://api.foursquare.com/v3/places/search
 */

export type Category = {
  id: number;
  name: string;
  icon: {
    prefix: string;
    suffix: string;
  };
};

export type RestaurantAPI = {
  fsq_id: string;
  categories: Category[];
  chains: any[];
  distance: number;
  geocodes: {
    main: {
      latitude: number;
      longitude: number;
    };
  };
  location: {
    address: string;
    address_extended: string;
    country: string;
    cross_street?: string;
    formatted_address: string;
    locality: string;
    neighborhood?: string[] | undefined;
    postcode: string;
    region: string;
  };
  name: string;
  related_places: Record<string, unknown>;
  timezone: string;
};

export type Restaurant = RestaurantAPI & {
  photos?: Photo[];
  tips?: Tip[];
};

/**
 * Type Definition of Photo data that we get from FourSquare API https://api.foursquare.com/v3/places/fsq_id/photos
 */

export type Photo = {
  id: string;
  created_at: string;
  prefix: string;
  suffix: string;
  width: number;
  height: number;
  classifications?: string[];
};

/**
 * Type Definition of Tips data that we get from FourSquare API https://api.foursquare.com/v3/places/fsq_id/tips
 */

export type Tip = {
  id: string;
  created_at: string;
  text: string;
};
