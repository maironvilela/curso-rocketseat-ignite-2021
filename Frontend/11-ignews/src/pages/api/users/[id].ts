import { NextApiRequest, NextApiResponse } from 'next';
export default (request: NextApiRequest, response: NextApiResponse) => {
  const { id } = request.query;
  const users = ['Maria', 'Pedro', 'Joaquim'];
  return response.json(users[Number(id) - 1]);
};
