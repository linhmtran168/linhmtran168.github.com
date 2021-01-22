import Layout from '../components/layout';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { getAllArticles } from '../libs/api';
import ArticleType from '../types/article';
import Link from 'next/link';

type Props = {
  articles: ArticleType[];
};

const Index = ({ articles }: Props): JSX.Element => {
  return (
    <Layout>
      <Head>
        <title>A Lazy Developer&lsquo;s blog</title>
      </Head>
      <div className="flex flex-col">
        <h1>All Posts</h1>
        <ul>
          {articles.map((ale, i) => (
            <li key={i} className="mt-4">
              <Link as={`/posts/${ale.uri}`} href="/posts/[...slug]">
                <a className="hover:underline">
                  <h2>{ale.title}</h2>
                </a>
              </Link>
              <p className="text-sm italic leading-loose text-opacity-90">{ale.updatedTime}</p>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const articles = getAllArticles();

  return {
    props: { articles }
  };
};

export default Index;
