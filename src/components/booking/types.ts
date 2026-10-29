/** The slice of a tour the booking form needs — kept small because it's sent to the browser. */
export type BookableTour = {
  slug: string;
  title: string;
  category: string;
  days: number;
  price: number;
  image: string;
  location: string;
};
