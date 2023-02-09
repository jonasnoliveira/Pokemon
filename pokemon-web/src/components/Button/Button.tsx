type Props = {
  children: React.ReactNode;
};

export function Button({children }: Props) {
  return (
    <button className='flex items-center p-2 space-x-3 rounded-md'>
      {children}
    </button>
  );
}
