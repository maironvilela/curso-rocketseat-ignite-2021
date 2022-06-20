import Prismic from '@prismicio/client';
import { DefaultClient } from '@prismicio/client/types/client';

export function getPrismicClient(req?: unknown): DefaultClient {
  const apiEndpoint = process.env.PRISMIC_API_ENDPOINT;
  const accessToken = process.env.NEXT_PUBLIC_PRISMIC_ACCESS_TOKEN;

  const prismic = Prismic.client(apiEndpoint, { accessToken, req });

  return prismic;
}
