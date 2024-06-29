import { Link } from "@/components/ui/link";

export default function NotFound() {
  return (
    <div className="flex h-[80dvh] flex-col items-center justify-center">
      <h1>404</h1>
      <div>Team not found</div>
      <Link variant="external" target="_self" href="/">
        Go to homepage
      </Link>
    </div>
  );
}
