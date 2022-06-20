import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../../../services/prismic';
import styles from '../posts.module.scss';

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

      <main className={styles.container}>
        <article className={styles.post}>
          <strong>{post.title}</strong>
          <time>{post.createdAt}</time>
          <div
            className={`${styles.content} ${styles.previewContext}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>

          <div className={styles.continueReading}>
            Continuar lendo?
            <Link href="/">
              <a>Inscreva-se agora🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { uid } = params;
  const prismicClient = getPrismicClient(req);

  const response = await prismicClient.getByUID('post', String(uid), {});

  console.log(JSON.stringify(response, null, 2));

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
    content: RichText.asHtml(response.data.content.splice(0, 6)),
  };
  return {
    props: { post },
  };
};
