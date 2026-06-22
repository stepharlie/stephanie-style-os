import type { ColorFamily, PricePoint, WishlistItem } from "@/types/wardrobe";

const toneByColor: Record<ColorFamily, string> = {
  black: "#241711",
  brown: "#94714d",
  cream: "#c9b896",
  beige: "#c4aa84",
  white: "#cdbd9f",
  burgundy: "#6b2f2a",
  olive: "#6f6b43",
  camel: "#c4aa84",
  plum: "#5d3f4d",
  mustard: "#b58a3f",
  denim: "#35485e",
  blue: "#3f5f7f",
  statement: "#9a6f6c",
};

const decisionLabel: Record<string, string> = {
  "buy-priority": "Buy priority",
  wishlist: "Wishlist",
  consider: "Consider",
  skip: "Skip",
};

function money(n?: number) {
  if (typeof n !== "number") return "—";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(n);
}

function buildSpark(points: PricePoint[] = []) {
  if (points.length === 0) return null;

  const prices = points.map((point) => point.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = Math.max(max - min, 1);
  const pad = 5;

  const pts = points.map((point, index) => {
    const x = points.length === 1 ? 50 : (index / (points.length - 1)) * 100;
    const y = pad + (1 - (point.price - min) / range) * (34 - pad * 2);

    return [x, y] as const;
  });

  const line = pts
    .map((point, index) => {
      return `${index === 0 ? "M" : "L"} ${point[0].toFixed(
        2,
      )} ${point[1].toFixed(2)}`;
    })
    .join(" ");

  const last = pts[pts.length - 1];

  return {
    line,
    area: `${line} L 100 34 L 0 34 Z`,
    dotX: last[0].toFixed(2),
    dotY: last[1].toFixed(2),
  };
}

export function WishlistCard({ item }: { item: WishlistItem }) {
  const tone = toneByColor[item.colorFamily];
  const spark = buildSpark(item.priceHistory);

  const prices = item.priceHistory?.map((point) => point.price) ?? [];
  const highPrice = prices.length > 0 ? Math.max(...prices) : undefined;
  const lowPrice = prices.length > 0 ? Math.min(...prices) : undefined;

  const meta = [
    { label: "Color", value: item.colorName },
    { label: "Gap", value: item.closetGap },
    { label: "Duplicate risk", value: item.duplicateRisk },
  ];

  const scores = [
    { label: "Priority", value: item.priorityScore },
    { label: "Outfits", value: item.outfitPotential },
    { label: "Impact", value: item.closetImpactScore },
  ];

  return (
    <article className="overflow-hidden rounded-[3px] border border-[var(--line)] bg-[var(--paper-2)]">
      <div
        className="relative grid h-48 place-items-center"
        style={{ background: tone }}
      >
        <span className="pointer-events-none absolute inset-3.5 rounded-[2px] border border-white/20" />

        <button
          type="button"
          className="absolute right-3 top-3 rounded-full border border-white/40 bg-[rgba(251,246,238,0.86)] px-2.5 py-1.5 text-[0.52rem] font-semibold uppercase tracking-[0.18em] text-[var(--espresso)] backdrop-blur"
        >
          {item.imageUrl ? "Edit image" : "+ Image"}
        </button>

        <span className="relative text-[0.55rem] font-semibold uppercase tracking-[0.26em] text-white/70">
          Wishlist image
        </span>
      </div>

      <div className="px-7 pb-7 pt-6">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[0.58rem] font-medium uppercase tracking-[0.24em] text-[var(--caramel)]">
            Buy #{item.purchaseOrder} · {item.category}
          </span>

          <span className="inline-flex items-center gap-1.5 text-[0.55rem] font-medium uppercase tracking-[0.2em] text-[var(--coffee)]">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: tone }}
            />
            {decisionLabel[item.decision] ?? item.decision}
          </span>
        </div>

        <h3 className="font-display mb-5 mt-3.5 text-[2.1rem] leading-[1.05] text-[var(--espresso)]">
          {item.name}
        </h3>

        <div>
          {meta.map((metaItem) => (
            <div
              key={metaItem.label}
              className="flex justify-between gap-3 border-t border-[var(--line)] py-[11px]"
            >
              <span className="text-[0.82rem] text-[var(--ink-soft)]">
                {metaItem.label}
              </span>
              <span className="text-[0.82rem] capitalize text-[var(--espresso)]">
                {metaItem.value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 flex border-y border-[var(--line)]">
          {scores.map((score, index) => (
            <div
              key={score.label}
              className={[
                "flex-1 px-1.5 py-4 text-center",
                index > 0 ? "border-l border-[var(--line)]" : "",
              ].join(" ")}
            >
              <p className="font-display text-[1.95rem] leading-none text-[var(--espresso)]">
                {score.value}
              </p>
              <p className="mt-2 text-[0.52rem] font-medium uppercase tracking-[0.2em] text-[var(--caramel)]">
                {score.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-[var(--line)] pt-[18px]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="mb-1.5 text-[0.55rem] font-medium uppercase tracking-[0.22em] text-[var(--caramel)]">
                Current price
              </p>
              <p className="font-display text-[1.9rem] leading-none text-[var(--espresso)]">
                {money(item.currentPrice)}
              </p>
            </div>

            <div className="text-right">
              <p className="mb-1.5 text-[0.55rem] font-medium uppercase tracking-[0.22em] text-[var(--caramel)]">
                Target
              </p>
              <p className="font-display text-[1.2rem] leading-none text-[var(--coffee)]">
                {money(item.targetPrice)}
              </p>
            </div>
          </div>

          {spark ? (
            <div className="mt-4">
              <svg
                viewBox="0 0 100 34"
                preserveAspectRatio="none"
                className="block h-10 w-full overflow-visible"
              >
                <path d={spark.area} fill={tone} fillOpacity={0.1} />
                <path
                  d={spark.line}
                  fill="none"
                  stroke="var(--caramel)"
                  strokeWidth={1.2}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
                <circle
                  cx={spark.dotX}
                  cy={spark.dotY}
                  r={2.4}
                  fill="var(--espresso)"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              <div className="mt-2 flex justify-between text-[0.56rem] uppercase tracking-[0.16em] text-[#9b8268]">
                <span>High {money(highPrice)}</span>
                <span>Low {money(lowPrice)}</span>
              </div>
            </div>
          ) : null}

          <div className="mt-[18px] flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-[7px] text-[0.56rem] font-medium uppercase tracking-[0.16em] text-[var(--coffee)]">
              <span
                className="h-[5px] w-[5px] rounded-full"
                style={{
                  background: item.priceWatch ? "var(--caramel)" : "#cdb89b",
                }}
              />
              {item.priceWatch ? "Watching price" : "Watch off"}
            </span>

            <a
              href={item.productUrl ?? "#"}
              target="_blank"
              rel="noreferrer"
              className="border-b-[1.5px] border-[var(--espresso)] pb-[3px] text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-[var(--espresso)] no-underline"
            >
              View item
            </a>
          </div>
        </div>

        <p className="font-display mt-6 text-[1.05rem] italic leading-[1.4] text-[var(--coffee)]">
          {item.notes}
        </p>
      </div>
    </article>
  );
}
