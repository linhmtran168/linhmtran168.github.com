import Article from '../components/article';
import Layout from '../components/layout';

export default function About(): JSX.Element {
  return (
    <Layout>
      <div className="flex-col">
        <Article title="About" content="A lazy developer and a day dreamer. That’s all, folks :)" />
      </div>
    </Layout>
  );
}
