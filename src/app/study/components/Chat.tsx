'use client';

import { FC, useState } from 'react';
import { useChat } from 'ai/react';
import 'regenerator-runtime/runtime';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVolumeUp,
  FaPause,
} from 'react-icons/fa';
import { clsx } from '@mantine/core';

type Props = {};

export const Chat: FC<Props> = () => {
  const [startedListening, setStartedListening] = useState(false);

  const { messages, append, setInput, isLoading, stop } = useChat({
    api: '/api/chat',
  });

  const { listening } = useSpeechRecognition({
    commands: [
      {
        command: '*',
        callback: (command) => {
          if (command) {
            setInput(command);
            append({ role: 'user', content: command });
          }
        },
      },
    ],
  });

  const speechText = (text: string) => {
    if (typeof window === 'undefined') return;
    // console.log(
    //   window.speechSynthesis
    //     .getVoices()
    //     .filter((voice) => voice.lang === 'en-US'),
    // );
    const voice = window.speechSynthesis
      .getVoices()
      // .find((voice) => voice.name === 'Google US English');
      .find((voice) => voice.name === 'Google 日本語');
    if (!voice) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.rate = 1.5;
    speechSynthesis.speak(utterance);
  };
  const speechLastMessage = () => {
    if (messages.length === 0) return;
    const assistantMessages = messages.filter(
      (message) => message.role === 'assistant',
    );
    const lastAssistantMessage =
      assistantMessages[assistantMessages.length - 1];
    console.log(lastAssistantMessage);
    if (!lastAssistantMessage) return;
    speechText(lastAssistantMessage.content);
  };
  const stopSpeech = () => {
    speechSynthesis.cancel();
  };

  const toggleListening = async () => {
    const isRecognizing = SpeechRecognition.browserSupportsSpeechRecognition();
    console.log('isRecognizing', isRecognizing);

    if (startedListening) {
      await SpeechRecognition.stopListening();
      setStartedListening(false);
    } else {
      await SpeechRecognition.startListening({
        continuous: true,
        // language: 'en-US',
        // language: 'ja-JP',
      });
      setStartedListening(true);
    }
  };

  return (
    <div>
      {messages.length === 0 && (
        <div className='text-center text-2xl text-slate-600 font-bold'>
          Start talking!!
        </div>
      )}
      <div className='space-y-4 py-10'>
        {messages.map((message, index) => (
          <div
            key={index}
            className={clsx([
              'w-fit py-3 px-5 text-white rounded-t-xl max-w-[70%]',
              message.role === 'user'
                ? 'bg-slate-600 rounded-bl-xl ml-auto'
                : 'bg-blue-500 rounded-br-xl mr-auto',
            ])}
          >
            {message.content}
          </div>
        ))}
      </div>

      <div className='w-fit mx-auto flex gap-4'>
        <button
          className={clsx([
            'rounded-full w-16 h-16 grid place-content-center',
            'bg-red-500 hover:bg-red-700 text-white',
            listening && 'bg-green-500 hover:bg-green-700',
          ])}
          onClick={toggleListening}
        >
          {listening ? (
            <FaMicrophone size={32} />
          ) : (
            <FaMicrophoneSlash size={32} />
          )}
        </button>
        <button
          className={clsx([
            'rounded-full w-16 h-16 grid place-content-center',
            'bg-blue-500 hover:bg-blue-700 text-white',
            'disabled:bg-gray-500 disabled:cursor-not-allowed',
          ])}
          onClick={speechLastMessage}
          disabled={isLoading || messages.length === 0}
        >
          <FaVolumeUp size={32} />
        </button>
        <button
          className={clsx([
            'rounded-full w-16 h-16 grid place-content-center',
            'bg-red-500 hover:bg-red-700 text-white',
          ])}
          onClick={() => {
            stopSpeech();
            stop();
          }}
        >
          <FaPause size={24} />
        </button>
      </div>

      <div className='w-fit mx-auto flex gap-4 mt-8'>
        <button className='rounded-full py-3 px-5 font-bold grid place-content-center bg-blue-500 hover:bg-blue-700 text-white'>
          日本語で話す
        </button>
        <button className='rounded-full py-3 px-5 font-bold grid place-content-center bg-blue-500 hover:bg-blue-700 text-white'>
          英語で話す
        </button>
      </div>
    </div>
  );
};
