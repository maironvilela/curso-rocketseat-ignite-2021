import { render, screen } from '@testing-library/react';
import { mocked } from 'jest-mock';
import { getSession } from 'next-auth/react';
import Posts, { getServerSideProps } from '../../pages/posts/preview/[uid]';
import { getPrismicClient } from '../../services/prismic';

const post = {
  title: 'post_title',
  createdAt: '22/10/2021',
  content: 'summary',
};

jest.mock('next-auth/react');
jest.mock('../../services/prismic');
describe('PostsPreview Page', () => {
  it('render correctly', () => {
    render(<Posts post={post} />);
    const div = screen.getByText('summary');

    expect(screen.getByText('post_title')).toBeInTheDocument;
    expect(screen.getByText('22/10/2021')).toBeInTheDocument;
    expect(screen.getByText('summary')).toBeInTheDocument;
    expect(screen.getByText('Continuar lendo?')).toBeInTheDocument;
    expect(screen.getByText('Inscreva-se agora🤗')).toBeInTheDocument;
    expect(div).toHaveClass('content previewContext');
  });

  it('validate return getServerSideProps function ', () => {
    const useSessionMocked = mocked(getSession);
    const prismicGetByUID = mocked(getPrismicClient().getByUID);

    useSessionMocked.mockResolvedValueOnce({
      isSubscriptionActive: true,
    } as any);

    prismicGetByUID.mockResolvedValueOnce({
      first_publication_date: '22/10/2021',
      data: {
        title: [
          {
            text: 'Axios - um cliente HTTP Full Stack',
          },
        ],
        content: [
          {
            type: 'heading1',
            text: ' Introdução ',
            spans: [
              {
                start: 0,
                end: 12,
                type: 'strong',
              },
            ],
          },
          {
            type: 'paragraph',
            text: 'Axios é um cliente HTTP baseado em Promises para fazer requisições. Pode ser utilizado tanto no navegador quando no Node.js.',
            spans: [
              {
                start: 19,
                end: 23,
                type: 'hyperlink',
                data: {
                  link_type: 'Web',
                  url: 'https://howhttps.works/',
                },
              },
              {
                start: 35,
                end: 43,
                type: 'hyperlink',
                data: {
                  link_type: 'Web',
                  url: 'https://blog.rocketseat.com.br/javascript-assincrono-promises/',
                },
              },
            ],
          },
        ],
      },
    } as any);

    const response = getServerSideProps({
      req: {},
      params: {
        uuid: 'post 01',
      },
    });
  });
});
