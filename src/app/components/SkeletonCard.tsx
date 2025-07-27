import clsx from "clsx";

export default function SkeletonCard({ isLoading }: { isLoading?: boolean }) {
    return (
        <div className={clsx(
            'flex flex-col shadow-lg h-96 bg-neutral-800 p-5 text-gray-300',
            {
                'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent':
                    isLoading,
            }
        )}>
            <div className="relative max-h-72 flex-1 bg-neutral-700"/>
            <div className="flex justify-between font-bold my-3 bg-neutral-700"/>
            <div className="h-3 w-8/12 rounded-md bg-neitral-700"/>
        </div>
    )
}