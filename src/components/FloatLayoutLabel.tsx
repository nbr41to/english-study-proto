import { FC } from 'react';

type Props = {
  children: React.ReactNode;
};

export const FloatLayoutLabel: FC<Props> = ({ children }) => {
  return (
    <div className='py-1 px-2 font-bold bg-white absolute top-0 right-0'>
      {children}
    </div>
  );
};
