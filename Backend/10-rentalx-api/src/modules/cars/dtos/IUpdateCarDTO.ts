interface IUpdateCarDTO {
  name: string;
  description: string;
  daily_rate: number;
  available: boolean;
  fine_amount: number;
  brand: string;
  category_id: string;
}

export default IUpdateCarDTO;
