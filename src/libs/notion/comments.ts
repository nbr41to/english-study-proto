import { notion } from './client';
import { CreateCommentParameters } from '@notionhq/client/build/src/api-endpoints';

/**
 * BlockのCommentsを取得
 * @param block_id BlockのID
 * リアクションの絵文字は取得できない
 */
export const getComments = async (block_id: string) => {
  const response = await notion.comments.list({ block_id });

  return response;
};

/**
 * BlockにCommentsを追加
 * @param params NotionCreateCommentParameters
 */
export const createComment = async (params: CreateCommentParameters) =>
  await notion.comments.create(params);
