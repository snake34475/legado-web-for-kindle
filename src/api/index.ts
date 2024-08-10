import axios from 'axios';
import { BookChapter, BookInfo, Config, Response } from './types.ts';
import { state } from '../store';

const network = axios.create({
  baseURL: state.value.config.serverUrl,
});

/**
 * 用户配置
 */
export async function getConfig() {
  const url = '/getReadConfig';
  const data = await network.get<Response<string>>(url);
  return JSON.parse(data.data.data) as Config;
}

/**
 * 书架
 */
export async function getBookshelf() {
  const url = '/getBookshelf';
  const data = await network.get<Response<BookInfo[]>>(url);
  return data.data.data;
}

/**
 * 章节列表
 * @param bookUrl
 */
export async function getChapterList(bookUrl: string) {
  const url = '/getChapterList';
  const data = await network.get<Response<BookChapter[]>>(url, { params: { url: bookUrl } });
  return data.data.data;
}

/**
 * 章节正文
 * @param bookUrl 书源地址
 * @param index 第几章
 */
export async function getBookContent(bookUrl: string, index: number) {
  const url = '/getBookContent';
  const data = await network.get<Response<string>>(url, { params: { url: bookUrl, index } });
  return data.data.data;
}

interface ReadProgress {
  name: '武神主宰',
  author: '暗魔师',
  durChapterIndex: 7184,
  durChapterPos: 0,
  durChapterTime: 1723316403078,
  durChapterTitle: '第5728章 古仙路'
}

export function saveReadProgress(params: ReadProgress) {
  const url = '/saveBookProgress';
  return network.get(url, { params });
}