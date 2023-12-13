import {Skeleton} from "@mui/material";

export function PostSkeleton() {
  return <Skeleton variant="rectangular" className="w-full h-40" />;
}

export function CategorySkeleton() {
  return <Skeleton variant="rectangular" className="w-60 h-12" />;
}
