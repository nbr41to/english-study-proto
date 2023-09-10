'use client';
import { blockToJsx } from '@/components/notion/blockToJsx';
import { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints';
import { FC } from 'react';

type Props = {
  data: ListBlockChildrenResponse;
};

export const PostContent: FC<Props> = ({ data }) => {
  return (
    <div>
      {data.results.map((block) => (
        // @ts-expect-error
        <div key={block.id}>{blockToJsx(block)}</div>
      ))}
    </div>
  );
};
