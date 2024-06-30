interface SubmenuWrapperProps {
  children: React.ReactNode;
}

export const SubmenuWrapper = ({ children }: SubmenuWrapperProps) => {
  return (
    <div className="sticky top-0 z-10 flex w-full bg-background text-[13px] backdrop-blur-lg lg:text-[14px]">
      {children}
    </div>
  );
};
