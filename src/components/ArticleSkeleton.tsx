import { Skeleton } from "@/components/ui/skeleton";

const ArticleSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button Skeleton */}
          <Skeleton className="h-10 w-40 mb-8" />

          {/* Header Skeleton */}
          <header className="mb-8">
            <Skeleton className="h-6 w-24 mb-4" />
            <Skeleton className="h-12 w-full mb-2" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            
            {/* Meta info skeleton */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-24" />
            </div>

            {/* Tags skeleton */}
            <div className="flex flex-wrap gap-2 mb-8">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-14" />
            </div>
          </header>

          {/* Content Skeleton */}
          <article className="prose prose-lg max-w-none">
            <div className="space-y-4">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-8 w-2/3 mt-8" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-32 w-full mt-8" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default ArticleSkeleton;