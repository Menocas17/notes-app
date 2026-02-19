import NoteSkeleton from './NoteSkeleton';
export default function GridNoteSkeleton() {
  return (
    <section className='grid grid-cols-[repeat(auto-fit,minmax(200px,300px))] gap-6 justify-center mt-6'>
      {Array.from({ length: 6 }).map((_, index) => (
        <NoteSkeleton key={index} edit={false} />
      ))}
    </section>
  );
}
