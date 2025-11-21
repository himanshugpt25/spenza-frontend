type ScreenLoaderProps = {
  label?: string;
};

export const ScreenLoader = ({ label = "Loading..." }: ScreenLoaderProps) => (
  <section className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
    <div className="space-y-3 text-center">
      <div className="mx-auto h-1.5 w-32 animate-pulse rounded-full bg-white/30" />
      <p className="text-sm text-slate-300">{label}</p>
    </div>
  </section>
);
