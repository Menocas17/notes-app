export default function NoteSkeleton({ edit }: { edit: boolean }) {
  return (
    <div
      className={`max-w-2xl w-full p-6 bg-gray-100 dark:bg-transparent rounded-lg shadow-sm border border-gray-200 dark:border-primary animate-puls ${edit ? '' : 'h-70'} `}
    >
      {/* Title */}
      <div className='h-5 bg-gray-300 dark:bg-gray-400 rounded w-3/4 mb-4 '></div>

      {/*  Date and tags */}
      <div className='flex gap-3 mb-4'>
        <div className='h-4 bg-gray-300  rounded w-1/4'></div>
        <div className='h-4 bg-gray-300 dark:bg-gray-400  rounded w-1/4'></div>
      </div>

      {/* Content */}
      <div className='space-y-3'>
        <div className='h-4 bg-gray-300  rounded w-full'></div>
        <div className='h-4 bg-gray-300  rounded w-full'></div>
        <div className='h-4 bg-gray-300  rounded w-5/6'></div>
      </div>
    </div>
  );
}
