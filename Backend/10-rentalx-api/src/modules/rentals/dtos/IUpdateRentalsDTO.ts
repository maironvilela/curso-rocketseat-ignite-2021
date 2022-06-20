interface IUpdateRentalsDTO {
  id: string;
  car_id: string;
  user_id: string;
  expected_return_date: Date;
  start_date: Date;
  end_date: Date;
  total: number;
}

export default IUpdateRentalsDTO;
