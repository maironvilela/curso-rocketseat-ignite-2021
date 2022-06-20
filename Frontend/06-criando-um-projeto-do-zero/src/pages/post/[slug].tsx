import { GetStaticPaths, GetStaticProps } from 'next';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

import { useRouter } from 'next/router';

import { FiCalendar } from 'react-icons/fi';
import { FiUser } from 'react-icons/fi';
import { FiClock } from 'react-icons/fi';

import Image from 'next/image';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { useMemo } from 'react';
import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  const router = useRouter();

  /*
  calcula o tempo de leitura do texto levando em consideração a quantidade
  de palavras dividida pela quantidade de palavras lidar por uma pessoa por minuto
  */
  const readTime = useMemo(() => {
    const averageWordsRead = 200;

    const quantityWords = post.data.content.reduce(
      (acc, c) =>
        acc +
        c.heading?.split(' ').length +
        c.body.reduce((ac, body) => body.text?.split(' ').length + ac, 0),
      0
    );

    return `${Math.ceil(quantityWords / averageWordsRead)} min`;
  }, [post.data.content]);

  if (router.isFallback) {
    return <div>Carregando...</div>;
  }

  return (
    <main className={commonStyles.main}>
      <Image
        className={styles.img_card}
        width={1440}
        height={400}
        src={post.data.banner.url}
        alt="Banner"
        objectFit="cover"
      />

      <div className={styles.container}>
        <h1>{post.data.title}</h1>

        <div className={styles.info}>
          <div>
            <FiCalendar color="#BBBBBB" size="20" />
            <span className={styles.date}>
              {format(new Date(post.first_publication_date), 'dd MMM yyyy', {
                locale: ptBR,
              })}
            </span>
          </div>

          <div>
            <FiUser color="#BBBBBB" size="20" />
            <span className={styles.date}>{post.data.author}</span>
          </div>

          <div>
            <FiClock color="#BBBBBB" size="20" />
            <span className={styles.date}>{readTime}</span>
          </div>

          <div className="containt" />
        </div>

        <div className={styles.content}>
          {post.data.content.map(content => {
            return (
              <div key={content.heading}>
                <h2>{content.heading}</h2>
                <div
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: RichText.asHtml(content.body),
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.Predicates.at('document.type', 'posts')],
    {
      fetch: ['post.title', 'post.subtitle', 'post.author'],
    }
  );

  const params = postsResponse.results.map(post => {
    return {
      params: {
        slug: post.uid,
      },
    };
  });
  return {
    paths: params,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), {});

  const post = {
    uid: response.uid,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      author: response.data.author,
      banner: {
        url: response.data.banner.url,
      },
      content: response.data.content,
    },
    first_publication_date: response.first_publication_date,
    /* first_publication_date: new Date(
      response.last_publication_date
    ).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }),

    first_publication_date: format(
      new Date(response.first_publication_date),
      'dd MMM yyyy',
      {
        locale: ptBR,
      }
    ), */
  };

  return {
    props: {
      post,
    },
    revalidate: 60 * 60 * 24,
  };
};
