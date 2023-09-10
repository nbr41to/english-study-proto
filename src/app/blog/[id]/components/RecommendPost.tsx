import { getDatabaseContents } from '@/libs/notion/databases';
import { blogDatabaseId } from '@/libs/notion/ids';
import Link from 'next/link';

const getPosts = async () => {
  const postsArray = await getDatabaseContents({
    database_id: blogDatabaseId,
    page_size: 3,
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
    filter: {
      and: [
        {
          property: 'Status',
          select: {
            equals: 'PUBLISH',
          },
        },
        {
          property: 'Date',
          date: {
            is_not_empty: true,
          },
        },
      ],
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 5000));

  return postsArray;
};

export const RecommendPost = async () => {
  const data = await getPosts();

  return (
    <div className='flex flex-col gap-4 border rounded border-black p-4 h-44'>
      <h2 className='font-bold'>Recommend Post（Server Component）</h2>
      {data.results.map((post) => (
        <Link
          key={post.id}
          href={`/blog/${post.id}`}
          className=' hover:underline'
        >
          {/* @ts-expect-error */}
          {post.properties.Title.title[0].plain_text}
        </Link>
      ))}
    </div>
  );
};
