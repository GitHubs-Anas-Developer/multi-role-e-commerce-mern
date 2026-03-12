"use client";

import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProductSkeleton() {
  return (
    <div className="product-grid">
      {Array(6)
        .fill()
        .map((_, i) => (
          <div key={i} className="product-card">
            <Skeleton height={150} /> {/* image */}
            <Skeleton height={20} style={{ margin: "10px 0" }} /> {/* title */}
            <Skeleton height={20} width={80} /> {/* price */}
          </div>
        ))}
    </div>
  );
}
