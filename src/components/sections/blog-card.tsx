import Link from "next/link";
import { ArrowRight, Clock, MapPin, Tag, BookOpen, Flame } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { getPostContent, type BlogCategory, type BlogPost } from "@/lib/data/blog";

const categoryStyle: Record<
  BlogCategory,
  { gradient: string; Icon: typeof MapPin }
> = {
  local: { gradient: "from-brand via-brand-3 to-accent", Icon: MapPin },
  prices: { gradient: "from-brand-2 via-brand to-brand-3", Icon: Tag },
  guide: { gradient: "from-brand-3 via-brand to-brand-2", Icon: BookOpen },
  heating: { gradient: "from-accent via-accent-2 to-brand", Icon: Flame },
};

export function BlogCard({
  post,
  locale,
  dict,
}: {
  post: BlogPost;
  locale: Locale;
  dict: Dictionary;
}) {
  const c = getPostContent(post, locale);
  const { gradient, Icon } = categoryStyle[post.category];
  return (
    <Link
      href={`/${locale}/blog/${post.slug}/`}
      className="group surface-card rounded-3xl overflow-hidden flex flex-col"
    >
      <div
        className={`relative aspect-[16/10] bg-gradient-to-br ${gradient} overflow-hidden`}
      >
        <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
        <Icon
          className="absolute -right-4 -bottom-4 size-32 text-white/15"
          strokeWidth={1.25}
          aria-hidden
        />
        <span className="absolute left-5 top-5 inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-brand-2">
          {dict.blog.categories[post.category]}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold leading-snug text-fg transition group-hover:text-brand">
          {c.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-fg-muted">
          {c.excerpt}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs text-fg-dim">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" />
            {post.readingMinutes} {dict.blog.minRead}
          </span>
          <span className="inline-flex items-center gap-1.5 font-medium text-brand">
            {dict.blog.readMore}
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
