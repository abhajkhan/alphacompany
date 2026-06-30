import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function Home() {
  return (
    <main className="min-h-screen bg-background-primary flex items-center justify-center">
      <Container>
        <div className="text-center py-32 flex flex-col items-center gap-6">
          <p className="font-mono text-xs text-text-muted uppercase tracking-widest">
            Phase 1 Complete
          </p>
          <h1 className="font-sans font-bold text-5xl text-text-primary">
            Alpha Company
          </h1>
          <p className="text-text-secondary font-sans text-lg max-w-md">
            Foundation and component library ready. Pages will be built in Phase 3.
          </p>
          <Link
            href="/components"
            className="inline-flex items-center gap-2 text-accent-blue hover:text-accent-blue-hover font-sans font-medium text-sm transition-colors"
          >
            View Component Library →
          </Link>
        </div>
      </Container>
    </main>
  );
}
