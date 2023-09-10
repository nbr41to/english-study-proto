import { RichText } from '@/components/notion/RichText';
import type { BulletedListItemBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { FC } from 'react';

type Props = {
  block: BulletedListItemBlockObjectResponse;
};

export const BulletedListItem: FC<Props> = ({ block }) => {
  return (
    <li className='sp:text-sm'>
      <RichText text={block.bulleted_list_item.rich_text} />
    </li>
  );
};
