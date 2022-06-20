import { NextApiRequest, NextApiResponse } from 'next';
import { continents } from '../_repository/continentsRepository';
export default (request: NextApiRequest, response: NextApiResponse) => {
  const { id } = request.query;

  const result = continents.find(continent => continent.id === id);

  return response.status(200).json(result);
};
