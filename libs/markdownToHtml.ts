import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import highlight from 'rehype-highlight';
import unified from 'unified';
import html from 'rehype-stringify';
import math from 'remark-math';
import katex from 'rehype-katex';

export default async function markdownToHtml(markdownStr: string): Promise<string> {
  const result = await unified()
    .use(markdown)
    .use(math)
    .use(remark2rehype)
    .use(katex)
    .use(highlight)
    .use(html)
    .process(markdownStr);
  return result.toString();
}
