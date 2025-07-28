// components/early-adopters/EarlyAdoptersFlow.tsx
"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useEarlyAdoptersStore } from "@/store/early-adopters-store";

// Dynamically import the modal to reduce initial bundle size
const EarlyAdoptersModal = dynamic(
  () => import("./EarlyAdoptersModal"),
  {
    ssr: false,
    loading: () => null, // No loading component needed since modal is hidden initially
  }
);

/**
 * Main integration component for the Early Adopters flow
 */
export const EarlyAdoptersFlow: React.FC = () => {
  const isModalOpen = useEarlyAdoptersStore((state) => state.isModalOpen);

  // Debug log to check if state is updating
  console.log("EarlyAdoptersFlow - Modal open:", isModalOpen);

  // Only render the modal when it's actually needed
  return isModalOpen ? <EarlyAdoptersModal /> : null;
};

export default EarlyAdoptersFlow;