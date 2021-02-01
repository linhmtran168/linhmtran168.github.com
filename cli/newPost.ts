#!/usr/bin/env ts-node-script
import { format } from 'date-fns';
import yargs from 'yargs';
import fs from 'fs';

const options = yargs
  .usage('Usage: -t <title> -cs <custom slug>')
  .option('t', { alias: 'title', desc: 'Post title', type: 'string', demandOption: true })
  .option('s', { alias: 'slug', desc: 'Custom slug for the post', type: 'string', demandOption: false }).argv;

const title = options.title as string;
const postDate = format(new Date(), 'yyyy-mm-dd');
let slug = options.slug as string;

if (!slug) {
  slug = title
    .trim()
    .toLowerCase()
    .replace(/[^A-Z0-9]+/gi, '-');
}

const postContent = `---
layout: post
title: ${title} 
date: ${postDate}
---
`;

const filePath = `./_posts/${postDate}-${slug}.md`;

if (fs.existsSync(filePath)) {
  console.log('A post with same title already existed');
  process.exit(1);
}

try {
  fs.writeFileSync(filePath, postContent);
  console.log(`${filePath} successfully created!`);
  process.exit(0);
} catch (err) {
  console.error(err);
  process.exit(1);
}
