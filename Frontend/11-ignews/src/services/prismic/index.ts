import Prismic from '@prismicio/client';

export function getPrismicClient(req?: unknown) {
  const prismicAccessToken = process.env.PRISMIC_ACCESS_TOKEN;
  const apiEndpoint = process.env.PRISMIC_ENDPOINT;

  const prismicClient = Prismic.client(apiEndpoint, {
    accessToken: prismicAccessToken,
    req,
  });

  return prismicClient;
}
