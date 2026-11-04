export default function PagePlaceholder({ title, description }) {
  return (
    <section className="rounded-xl border border-dashed border-border bg-card p-8 text-center sm:p-12">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted">{description}</p>
    </section>
  );
}
