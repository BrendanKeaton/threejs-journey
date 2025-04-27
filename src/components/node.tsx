"use client";

import { ReactNode, useEffect, useState } from "react";

interface NodeProps {
  title: string;
  id: string;
  children?: () => ReactNode;
  automatic_load?: boolean;
}

export default function Node({
  title,
  id,
  children,
  automatic_load,
}: NodeProps) {
  const [loaded, setLoaded] = useState(automatic_load);

  useEffect(() => {
    if (automatic_load) {
      setLoaded(true);
    }
  }, [automatic_load]);

  const handleLoadClick = () => {
    setLoaded(true);
  };

  return (
    <section id={id} className="w-full container mx-auto px-12">
      <div className="border border-gray-300 rounded-xl p-6 bg-white h-[85vh] flex flex-col justify-start gap-4">
        <h2 className="text-2xl font-bold text-gray-800 place-self-end">
          {title}
        </h2>

        {/* Scene Load Section */}
        {!loaded && (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="flex flex-col gap-y-6 p-10 border rounded-sm border-dashed items-center">
              <p className="text-gray-400 max-w-sm text-center">
                Some scenes are manually loaded to optimize initial page
                performance and prevent potential lag from heavy assets.
              </p>
              <button
                onClick={handleLoadClick}
                className="bg-black hover:bg-neutral-700 transition duration-200 text-white p-2 hover:cursor-pointer w-48 text-base"
              >
                Load Scene
              </button>
            </div>
          </div>
        )}

        {/* Scene Content */}
        {loaded && (
          <div className="w-full h-full">{children && children()}</div>
        )}
      </div>
    </section>
  );
}
