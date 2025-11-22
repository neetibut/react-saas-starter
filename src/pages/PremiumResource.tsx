type PremiumArticle = {
  title: string;
  date: string;
  category: string;
  description: string;
  link: string;
};

const articles: PremiumArticle[] = [
  {
    title: "Mastering React Server Components",
    date: "2023-03-16",
    category: "Advanced React",
    description:
      "Learn how to leverage the power of RSC to build faster, more efficient applications. We dive deep into streaming, suspense, and data fetching strategies.",
    link: "#",
  },
  {
    title: "Scaling Node.js Microservices",
    date: "2023-03-10",
    category: "System Design",
    description:
      "A comprehensive guide to building resilient microservices with Node.js, Docker, and Kubernetes. Includes real-world examples of handling high traffic.",
    link: "#",
  },
  {
    title: "Negotiating Your Senior Engineer Salary",
    date: "2023-02-12",
    category: "Career Growth",
    description:
      "Don't leave money on the table. Learn the exact scripts and strategies to negotiate a top-tier compensation package in the tech industry.",
    link: "#",
  },
];

export default function PremiumResource() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Premium Resources
          </h2>
          <p className="mt-2 text-lg leading-8 text-secondary">
            Exclusive content for our Pro subscribers.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-muted pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.title}
              className="flex max-w-xl flex-col items-start justify-between card-surface border-muted p-6 rounded-lg"
            >
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={article.date} className="text-secondary">
                  {new Date(article.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
                <span className="relative z-10 rounded-full bg-neutral-800 px-3 py-1.5 font-medium text-secondary hover:bg-neutral-700">
                  {article.category}
                </span>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-primary group-hover:text-secondary">
                  <a href={article.link}>
                    <span className="absolute inset-0" />
                    {article.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-secondary">
                  {article.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
