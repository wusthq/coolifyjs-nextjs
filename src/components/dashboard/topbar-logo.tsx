import Link from "next/link";

export const TopbarLogo = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <Link href="/">
        <div className="py-1 text-[14px] font-semibold">CoolifyJS Next</div>
      </Link>
    </div>
  );
};
