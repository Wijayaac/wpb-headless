"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

function VariantButton({ variant, children }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const variantId = variant.node.id.split("/").pop(); // used later
  // check if the current variant is selected
  const isSelected = searchParams.get("variant") ? searchParams.get("variant") === variant.node.title : false;

  return (
    <button
      onClick={() => {
        router.push(`?variant=${variant.node.title}`);
      }}
      // TODO: install clsx library for dynamic class names
      className={`rounded-full border border-black hover:border-blue-400 p-2 bg-gray-800 ${isSelected ? "border-blue-400" : ""}`}>
      {children}
    </button>
  );
}

export default VariantButton;
