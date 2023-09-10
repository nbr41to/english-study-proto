import { PostContent } from '@/app/blog/[id]/components/PostContent';
import { RecommendPost } from '@/app/blog/[id]/components/RecommendPost';
import { Loading } from '@/components/Loading';
import { getChildrenInBlock } from '@/libs/notion/blocks';
import { Suspense } from 'react';

const getPost = async (block_id: string) => {
  const post = getChildrenInBlock({
    block_id,
  });

  return post;
};

export default async function BlogDetail({
  params,
}: {
  params: { id: string };
}) {
  const data = await getPost(params.id);

  return (
    <main className=''>
      <h1>BlogDetail</h1>
      {/* `loading.tsx`を作らなければ各所のLoadingをカスタマイズできる */}
      <Suspense
        fallback={
          <div className='h-44 relative'>
            <Loading />
          </div>
        }
      >
        <RecommendPost />
      </Suspense>
      <Suspense fallback={<p>Loading feed2...</p>}>
        <PostContent data={data} />
      </Suspense>
    </main>
  );
}
