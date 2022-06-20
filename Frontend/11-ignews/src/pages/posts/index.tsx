import Prismic from '@prismicio/client';
import { GetStaticProps } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss';

type Post = {
  uid: string;
  createdAt: string;
  summary: string;
  title: string;
};

interface PostProps {
  posts: Post[];
}

export default function Post({ posts }: PostProps) {
  const { data: session } = useSession();

  return (
    <>
      <main className={styles.container}>
        <div className={styles.post}>
          {posts.map(post => (
            <Link
              href={
                session?.isSubscriptionActive
                  ? `./posts/${post.uid}`
                  : `./posts/preview/${post.uid}`
              }
              key={post.uid}
            >
              <a>
                <time>{post.createdAt}</time>
                <strong>{post.title}</strong>
                <p>{post.summary}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const clientPrismic = getPrismicClient();

  const docs = await clientPrismic.query(
    Prismic.Predicates.at('document.type', 'post'),
    {
      fetch: ['post.title', 'post.content'],
      pageSize: 100,
    },
  );

  const postsSummary = docs.results.map(post => {
    return {
      uid: post.uid,
      title: RichText.asText(post.data.title),
      createdAt: new Date(post.first_publication_date).toLocaleDateString(
        'pt-BR',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        },
      ),
      summary:
        post.data.content.find(content => content.type === 'paragraph')?.text ??
        '',
    };
  });

  return {
    props: {
      posts: postsSummary,
    },
  };
};
