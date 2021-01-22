import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import highlight from 'rehype-highlight';
import unified from 'unified';
import html from 'rehype-stringify';

export default async function markdownToHtml(markdownStr: string): Promise<string> {
  const result = await unified().use(markdown).use(remark2rehype).use(highlight).use(html).process(markdownStr);
  return result.toString();
}
