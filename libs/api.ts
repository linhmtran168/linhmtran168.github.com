import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import ArticleType from '../types/article';
import { format } from 'date-fns';

const articlesDir = path.join(process.cwd(), '_posts');

function getArticleSlug(fileName: string): string[] {
  const name = fileName.slice(0, -3);
  const re = /^(\d{4})-(\d{2})-(\d{2})-([a-z0-9\\-]+)$/;

  const matches = name.match(re);

  return matches ? matches.slice(1) : [];
}

function getArticleFileNames(): string[] {
  const fileNames = fs.readdirSync(articlesDir);
  return fileNames ? fileNames : [];
}

function getArticleByFileName(fileName: string, slug: string[]): ArticleType {
  const fullpath = path.join(articlesDir, fileName);
  const fileContent = fs.readFileSync(fullpath, 'utf-8');
  const { data, content } = matter(fileContent);

  const uri = slug.map(encodeURIComponent).join('/');
  return { title: data.title, slug, uri, updatedTime: format(data.date, 'yyyy/MM/dd'), content: content };
}

export function getArticleBySlug(slug: string[]): ArticleType {
  const fileName = slug.join('-');
  return getArticleByFileName(fileName + '.md', slug);
}

export function getAllArticles(): ArticleType[] {
  const fileNames = getArticleFileNames();
  return fileNames
    .map((fileName) => getArticleByFileName(fileName, getArticleSlug(fileName)))
    .sort((a1, a2) => (a1.updatedTime! > a2.updatedTime! ? -1 : 1));
}
