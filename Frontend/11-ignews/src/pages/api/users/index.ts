import { NextApiRequest, NextApiResponse } from 'next';
export default (request: NextApiRequest, response: NextApiResponse) => {
  const users = ['Maria', 'Pedro', 'Joaquim'];

  return response.json(users);
};
