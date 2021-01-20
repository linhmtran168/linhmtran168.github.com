import Layout from '../components/layout';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { getAllArticles } from '../libs/api';
import ArticleType from '../types/article';

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
            <li key={i}>
              <h2>{ale.title}</h2>
              <p>{ale.updatedTime}</p>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const articles = getAllArticles();

  console.log(articles);
  return {
    props: { articles }
  };
};

export default Index;
