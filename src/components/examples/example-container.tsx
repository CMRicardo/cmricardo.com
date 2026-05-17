import type React from "react";

export const ExampleContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className="grid w-full place-items-center rounded-md px-4 py-8">
    {children}
  </div>
);
