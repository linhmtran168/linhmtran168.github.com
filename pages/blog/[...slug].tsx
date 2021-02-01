import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import ErrorPage from 'next/error';
import { ParsedUrlQuery } from 'querystring';
import Article from '../../components/article';
import Layout from '../../components/layout';
import { getAllArticles, getArticleBySlug } from '../../libs/api';
import markdownToHtml from '../../libs/markdownToHtml';
import ArticleType from '../../types/article';

type Props = {
  article: ArticleType;
};

export default function Post({ article }: Props): JSX.Element {
  const router = useRouter();
  if (!router.isFallback && !article?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return <Layout>{router.isFallback ? <h1>Loading..</h1> : <Article article={article} />}</Layout>;
}

interface Params extends ParsedUrlQuery {
  slug: string[];
}

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params as Params;
  const article = getArticleBySlug(params.slug);
  const content = await markdownToHtml(article.content!);

  return {
    props: {
      article: {
        ...article,
        content
      }
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllArticles();

  return {
    paths: posts.map((p) => {
      return {
        params: {
          slug: p.slug
        }
      };
    }),
    fallback: false
  };
};
