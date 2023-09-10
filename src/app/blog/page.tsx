// import { getDatabaseContents } from '@/libs/notion/databases';
// import { blogDatabaseId } from '@/libs/notion/ids';
// import Link from 'next/link';

// const getPosts = async () => {
//   const postsArray = await getDatabaseContents({
//     database_id: blogDatabaseId,
//     page_size: 12,
//     sorts: [
//       {
//         property: 'Date',
//         direction: 'descending',
//       },
//     ],
//     filter: {
//       and: [
//         {
//           property: 'Status',
//           select: {
//             equals: 'PUBLISH',
//           },
//         },
//         {
//           property: 'Date',
//           date: {
//             is_not_empty: true,
//           },
//         },
//       ],
//     },
//   });

//   return postsArray;
// };

export default async function Blog() {
  // const data = await getPosts();

  return (
    <main className=''>
      <h1>Blog</h1>
      <div className='flex flex-col'>
        <p>みたいブログのタイトルを選択しよう！</p>
      </div>
    </main>
  );
}
