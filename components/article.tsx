import Head from 'next/head';
import { ReactNode } from 'react';
import ArticleType from '../types/article';
import articleStyle from './article.module.css';

type ArticleProp = {
  children?: ReactNode;
  article: ArticleType;
};

const Article = ({ children, article }: ArticleProp): JSX.Element => {
  return (
    <article className="w-full">
      <Head>
        <title>{article.title}</title>
      </Head>
      <div className="flex-col">
        <div className="border-b layout-separator pb-1 flex flex-row items-baseline justify-between">
          <p className="text-3xl">{article.title}</p>
          {article.updatedTime && <p className="italic font-thin">{article.updatedTime}</p>}
        </div>
        {children ? (
          children
        ) : (
          <div className={articleStyle['markdown']} dangerouslySetInnerHTML={{ __html: article.content }}></div>
        )}
      </div>
    </article>
  );
};

export default Article;
