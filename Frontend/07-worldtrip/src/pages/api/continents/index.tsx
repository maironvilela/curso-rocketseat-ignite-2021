import { NextApiRequest, NextApiResponse } from 'next';
import { continents } from '../_repository/continentsRepository';

export default (request: NextApiRequest, response: NextApiResponse) => {
  return response.json(continents);
};
