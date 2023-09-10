'use client';

import { Chat } from '@/app/study/components/Chat';
import Completion from '@/app/study/components/Completion';
import { PostEditorPage } from '@/app/study/components/SpellCheckSample';

export default function Study() {
  return (
    <div>
      <h1>StudyPage</h1>
      <Chat />
      {/* <Completion />
      <PostEditorPage /> */}
    </div>
  );
}
