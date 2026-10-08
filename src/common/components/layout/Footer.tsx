import { FOOTER_LINKS } from "@/common/constants/navigation.constants";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-6">
        <p>
          Made with <span aria-label="love">❤️</span> by Jatin
        </p>
        <nav aria-label="Author links" className="flex items-center gap-5">
          {FOOTER_LINKS.map(({ name, href }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-primary"
            >
              {name} <span aria-hidden>↗</span>
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
