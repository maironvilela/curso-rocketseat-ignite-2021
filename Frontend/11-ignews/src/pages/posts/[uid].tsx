import { GetStaticProps } from 'next';
import Head from 'next/head';
import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../../services/prismic';
import styles from './posts.module.scss';

type Post = {
  title: string;
  createdAt: string;
  content: string;
};

interface PostsProps {
  post: Post;
}
export default function Posts({ post }: PostsProps) {
  return (
    <>
      <Head> {post.title} | Ignews</Head>

      <button></button>

      <main className={styles.container}>
        <article className={styles.post}>
          <strong>{post.title}</strong>
          <time>{post.createdAt}</time>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths = () => {
  return {
    paths: [
      {
        params: {
          uid: 'criando-um-blog-com-contador-de-visitas-usando-nextjs',
        },
      },
    ],
    fallback: 'blocking',
  };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { uid } = params;
  const prismicClient = getPrismicClient();

  const response = await prismicClient.getByUID('post', String(uid), {});

  const post = {
    title: RichText.asText(response.data.title),
    createdAt: new Date(response.first_publication_date).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      },
    ),
    content: RichText.asHtml(response.data.content),
  };
  return {
    props: { post },
  };
};
