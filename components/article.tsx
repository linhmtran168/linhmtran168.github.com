import ArticleType from '../types/article';

const Article = ({ title, updatedTime, content }: ArticleType): JSX.Element => {
  return (
    <>
      <div className="flex-col">
        <div>
          <h1>{title}</h1>
          {updatedTime && <p>{updatedTime}</p>}
        </div>
        <div className="mt-8">
          <p>{content}</p>
        </div>
      </div>
    </>
  );
};

export default Article;
