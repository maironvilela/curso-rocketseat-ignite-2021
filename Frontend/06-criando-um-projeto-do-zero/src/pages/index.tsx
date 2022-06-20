import Link from 'next/link';
import Prismic from '@prismicio/client';

import { GetStaticProps } from 'next';

import { FiCalendar } from 'react-icons/fi';
import { FiUser } from 'react-icons/fi';

import Head from 'next/head';
import { useState } from 'react';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  const [posts, setPosts] = useState(postsPagination.results);
  const [nextPage, setNextPage] = useState(postsPagination.next_page);

  const handleNextPage = async () => {
    const token = process.env.NEXT_PUBLIC_PRISMIC_ACCESS_TOKEN;
    /**
    const response = await axios.get(
      `${nextPage}&access_token=MC5ZUlowUUJJQUFDa0FGcnp3.SO-_vVMXUkgAf10q77-977-9Ie-_ve-_vRIyKe-_vSHvv70JUVlBe--_ve-_ve-_vVRL77-9`
    );

    const postsNextPage = response.data.results.map(post => {
      return {
        data: {
          title: post.data.title,
          subtitle: post.data.subtitle,
          author: post.data.author,
        },
        uid: post.uid,
        first_publication_date: new Date(
          post.last_publication_date
        ).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
      };
    });

    setNextPage(response.data.next_page);

    setPosts([...posts, ...postsNextPage]);
     */

    fetch(
      `${nextPage}&access_token=MC5ZUlowUUJJQUFDa0FGcnp3.SO-_vVMXUkgAf10q77-977-9Ie-_ve-_vRIyKe-_vSHvv70JUVlBe--_ve-_ve-_vVRL77-9`
    )
      .then(response => response.json())
      .then(response => {
        setNextPage(response.next_page);
        const postsNextPage = response.results.map(post => {
          return {
            data: {
              title: post.data.title,
              subtitle: post.data.subtitle,
              author: post.data.author,
            },
            uid: post.uid,
            first_publication_date: post.first_publication_date,
          };
        });
        setPosts([...posts, ...postsNextPage]);
      });
  };

  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>
      <main className={commonStyles.main}>
        <div className={styles.container}>
          {posts.map(post => (
            <article className={styles.post} key={post.uid}>
              <Link href={`/post/${post.uid}`}>
                <a>
                  <h1> {post.data.title}</h1>
                  <span>{post.data.subtitle}</span>
                  <div className={styles.info}>
                    <div>
                      <FiCalendar color="#FFFFFF" size="20" />
                      <span className={styles.date}>
                        {format(
                          new Date(post.first_publication_date),
                          'dd MMM yyyy',
                          {
                            locale: ptBR,
                          }
                        )}
                      </span>
                    </div>

                    <div>
                      <FiUser color="#FFFFFF" size="20" />
                      <span className={styles.date}>{post.data.author}</span>
                    </div>
                  </div>
                </a>
              </Link>
            </article>
          ))}
          {nextPage && (
            <button type="button" onClick={handleNextPage}>
              Carregar mais posts
            </button>
          )}
        </div>
      </main>
      );
    </>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.Predicates.at('document.type', 'posts')],
    {
      pageSize: 1,
      page: 1,
      fetch: ['post.title', 'post.subtitle', 'post.author'],
    }
  );

  const posts = postsResponse.results.map(post => {
    return {
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      /* first_publication_date: format(
        new Date(post.first_publication_date),
        'dd MMM yyyy',
        {
          locale: ptBR,
        }
      ), */
    };
  });

  return {
    props: {
      postsPagination: {
        results: posts,
        next_page: postsResponse.next_page,
      },
    },
    revalidate: 60 * 60 * 24,
  };
};
