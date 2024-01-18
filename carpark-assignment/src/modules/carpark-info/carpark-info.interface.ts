export interface ICarparkCsv2JsonData {
  car_park_no: string;
  address: string;
  x_coord: string | number;
  y_coord: string | number;
  car_park_type: string;
  type_of_parking_system: string;
  short_term_parking: string;
  free_parking: string;
  night_parking: string;
  car_park_decks: string | number;
  gantry_height: string | number;
  car_park_basement: string;
}
