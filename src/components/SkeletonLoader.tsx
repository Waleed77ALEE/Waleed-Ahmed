import React from 'react';
import { motion } from 'motion/react';

// Reusable Pulse Shimmer Effect Element
export const SkeletonPulse: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse bg-slate-900/60 rounded-xl border border-slate-800/40 relative overflow-hidden ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-800/10 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
  </div>
);

// Skeleton for Product Grid in Marketplaces
export const ProductGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 space-y-4 flex flex-col justify-between h-[380px]"
        >
          <div className="space-y-4">
            {/* Top row: Logo skeleton + Price skeleton */}
            <div className="flex items-start justify-between gap-3">
              <SkeletonPulse className="w-12 h-12 rounded-2xl shrink-0" />
              <div className="space-y-1.5 flex flex-col items-end">
                <SkeletonPulse className="h-6 w-20 rounded-md" />
                <SkeletonPulse className="h-3 w-14 rounded" />
              </div>
            </div>

            {/* Badges + Title */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <SkeletonPulse className="h-4 w-16 rounded-full" />
                <SkeletonPulse className="h-4 w-20 rounded-full" />
              </div>
              <SkeletonPulse className="h-6 w-3/4 rounded-lg" />
              <SkeletonPulse className="h-3.5 w-1/2 rounded" />
            </div>

            {/* Description lines */}
            <div className="space-y-1.5 pt-1">
              <SkeletonPulse className="h-3 w-full rounded" />
              <SkeletonPulse className="h-3 w-5/6 rounded" />
            </div>

            {/* Feature items */}
            <div className="space-y-2 pt-3 border-t border-slate-800/60">
              <SkeletonPulse className="h-3 w-2/3 rounded" />
              <SkeletonPulse className="h-3 w-1/2 rounded" />
            </div>
          </div>

          {/* Action buttons + Footer skeleton */}
          <div className="pt-4 border-t border-slate-800/80 space-y-3">
            <div className="flex items-center gap-2">
              <SkeletonPulse className="h-10 w-full rounded-xl" />
              <SkeletonPulse className="h-10 w-full rounded-xl" />
            </div>
            <div className="flex justify-between items-center pt-2">
              <SkeletonPulse className="h-3 w-20 rounded" />
              <SkeletonPulse className="h-3 w-20 rounded" />
              <SkeletonPulse className="h-3 w-20 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Skeleton for the Marketplace Page
export const MarketplaceSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      {/* Search and Category Pills Skeleton */}
      <div className="space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <SkeletonPulse className="h-6 w-36 mx-auto rounded-full" />
          <SkeletonPulse className="h-10 sm:h-12 w-3/4 mx-auto" />
          <SkeletonPulse className="h-5 w-2/3 mx-auto" />
        </div>

        {/* Controls block */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 bg-slate-900/40 rounded-2xl border border-slate-900">
          <SkeletonPulse className="h-11 w-full md:w-80 rounded-xl" />
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {[1, 2, 3, 4, 5].map((i) => (
              <SkeletonPulse key={i} className="h-9 w-24 rounded-full" />
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="p-5 rounded-2xl border border-slate-900 bg-slate-950/40 space-y-4 flex flex-col justify-between h-[320px]">
            <div className="space-y-4">
              {/* Product Badge & Category */}
              <div className="flex items-center justify-between">
                <SkeletonPulse className="h-5 w-20 rounded-full" />
                <SkeletonPulse className="h-5 w-16 rounded-full" />
              </div>
              {/* Title & Info */}
              <div className="space-y-2">
                <SkeletonPulse className="h-6 w-3/4 rounded-lg" />
                <SkeletonPulse className="h-4 w-1/2 rounded-lg" />
              </div>
              {/* Description */}
              <div className="space-y-1.5">
                <SkeletonPulse className="h-3 w-full rounded" />
                <SkeletonPulse className="h-3 w-5/6 rounded" />
                <SkeletonPulse className="h-3 w-2/3 rounded" />
              </div>
            </div>
            {/* Price & Action */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-900">
              <SkeletonPulse className="h-6 w-16 rounded-md" />
              <SkeletonPulse className="h-9 w-24 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Skeleton for the Service Overview Page
export const ServiceOverviewSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header Skeleton */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <SkeletonPulse className="h-6 w-44 mx-auto rounded-full" />
        <SkeletonPulse className="h-10 sm:h-12 w-3/4 mx-auto" />
        <SkeletonPulse className="h-5 w-5/6 mx-auto" />
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-2xl p-7 border border-slate-900 bg-slate-950/40 space-y-6 flex flex-col justify-between h-[420px]">
            <div className="space-y-4">
              {/* Icon & Badge */}
              <div className="flex items-center justify-between">
                <SkeletonPulse className="h-12 w-12 rounded-2xl" />
                <SkeletonPulse className="h-5 w-20 rounded-full" />
              </div>
              {/* Title & Subtitle */}
              <div className="space-y-2">
                <SkeletonPulse className="h-7 w-2/3 rounded-lg" />
                <SkeletonPulse className="h-4 w-1/3 rounded" />
              </div>
              {/* Description */}
              <div className="space-y-1.5 pt-2">
                <SkeletonPulse className="h-3 w-full rounded" />
                <SkeletonPulse className="h-3 w-11/12 rounded" />
                <SkeletonPulse className="h-3 w-4/5 rounded" />
              </div>
              {/* Feature bullets */}
              <div className="space-y-2 pt-2 border-t border-slate-900">
                <SkeletonPulse className="h-3 w-1/2 rounded" />
                <SkeletonPulse className="h-3 w-2/3 rounded" />
              </div>
            </div>
            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-900">
              <SkeletonPulse className="h-5 w-24 rounded" />
              <SkeletonPulse className="h-8 w-20 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Skeleton for Single Service Page
export const SingleServiceSkeleton: React.FC = () => {
  return (
    <div className="space-y-12 pb-16">
      {/* Hero Header Skeleton */}
      <div className="border-b border-slate-900 bg-slate-900/10 py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Details */}
          <div className="lg:col-span-7 space-y-6">
            <SkeletonPulse className="h-6 w-32 rounded-full" />
            <SkeletonPulse className="h-12 w-4/5 rounded-xl" />
            <SkeletonPulse className="h-5 w-11/12 rounded-lg" />
            <SkeletonPulse className="h-5 w-4/5 rounded-lg" />
            
            {/* Stats display */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-900">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <SkeletonPulse className="h-8 w-16 rounded" />
                  <SkeletonPulse className="h-3 w-20 rounded" />
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <SkeletonPulse className="h-12 w-full sm:w-44 rounded-xl" />
              <SkeletonPulse className="h-12 w-full sm:w-40 rounded-xl" />
            </div>
          </div>

          {/* Right Hero Visual Card */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-2xl border border-slate-900 bg-slate-950/60 space-y-4">
              <SkeletonPulse className="h-44 w-full rounded-xl" />
              <div className="space-y-2">
                <SkeletonPulse className="h-5 w-2/3 rounded" />
                <SkeletonPulse className="h-3 w-1/2 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Body Features Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-6 rounded-2xl border border-slate-900 bg-slate-950/40 flex gap-4">
            <SkeletonPulse className="h-12 w-12 rounded-xl shrink-0" />
            <div className="space-y-3 w-full">
              <SkeletonPulse className="h-5 w-1/3 rounded" />
              <SkeletonPulse className="h-3.5 w-full rounded" />
              <SkeletonPulse className="h-3.5 w-4/5 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
