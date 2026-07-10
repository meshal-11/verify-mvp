import { notFound } from "next/navigation";
import { Clock3, Eye, Flag, Heart, MapPin, Share2 } from "lucide-react";
import { getListing, getSimilarListings } from "@/lib/data";
import SiteHeader from "@/components/site-header";
import Breadcrumb from "@/components/breadcrumb";
import Gallery from "@/components/gallery";
import PriceCard from "@/components/price-card";
import ActionBar from "@/components/action-bar";
import SpecsGrid from "@/components/specs-grid";
import DefectsCard from "@/components/defects-card";
import TrustCard from "@/components/trust-card";
import SimilarListings from "@/components/similar-listings";
import QuestionBox from "@/components/question-box";
import Reveal from "@/components/reveal";

/** الشاشة 9 — تفاصيل الإعلان (عرض المشتري) */
export default async function ListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = await getListing(id);
  if (!listing) notFound();
  const similar = await getSimilarListings();

  const secondaryActions = [
    { label: "مشاركة", icon: Share2 },
    { label: "تفضيل", icon: Heart },
    { label: "بلاغ", icon: Flag },
  ];

  return (
    <div className="min-h-dvh">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 pb-28 md:pb-12">
        <Breadcrumb
          items={["Verify السيارات", listing.make, listing.model, `${listing.model} ${listing.year}`]}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* المحتوى الرئيسي */}
          <div className="space-y-6 lg:col-span-8">
            {/* العنوان */}
            <Reveal>
              <h1 className="text-2xl font-black leading-snug text-ink sm:text-3xl">
                {listing.title}
              </h1>
              <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm font-medium text-muted">
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-4 text-primary" />
                  {listing.city} — {listing.district}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock3 className="size-4 text-primary" />
                  {listing.postedAgo}
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="size-4 text-primary" />
                  <span className="tabular-nums">
                    {listing.views.toLocaleString("en-US")}
                  </span>{" "}
                  مشاهدة
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <Gallery
                imageCount={listing.imageCount}
                mawjazLabel={listing.mawjaz.label}
                image={listing.image}
                mawjaz={listing.mawjaz.passed}
              />
            </Reveal>

            <Reveal delay={0.1}>
              <PriceCard
                price={listing.price}
                negotiable={listing.negotiable}
                topBid={listing.topBid}
                interestedBuyers={listing.interestedBuyers}
              />
            </Reveal>

            {/* بدون غلاف Reveal — الـ transform يكسر تثبيت الشريط السفلي للجوال */}
            <ActionBar price={listing.price} topBid={listing.topBid} />

            <SpecsGrid specs={listing.specs} />

            {listing.defects.length > 0 && (
              <Reveal>
                <DefectsCard defects={listing.defects} />
              </Reveal>
            )}

            {/* شريط الإجراءات الثانوية المألوف */}
            <Reveal>
              <div className="grid grid-cols-3 overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-line/60">
                {secondaryActions.map((action, i) => (
                  <button
                    key={action.label}
                    className={`flex min-h-13 cursor-pointer items-center justify-center gap-2 py-3.5 text-sm font-bold text-muted transition-colors hover:bg-page hover:text-primary ${
                      i > 0 ? "border-r border-line/60" : ""
                    }`}
                  >
                    <action.icon className="size-4.5" />
                    {action.label}
                  </button>
                ))}
              </div>
            </Reveal>

            {/* الوسوم */}
            <Reveal>
              <div className="flex flex-wrap gap-2">
                {listing.tags.map((tag) => (
                  <a
                    key={tag}
                    href="#"
                    className="rounded-full bg-white px-4 py-2 text-sm font-bold text-muted shadow-soft ring-1 ring-line/60 transition-all hover:text-primary hover:ring-primary/40"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <QuestionBox />
            </Reveal>
          </div>

          {/* العمود الجانبي */}
          <div className="space-y-4 lg:col-span-4">
            <Reveal delay={0.08}>
              <TrustCard seller={listing.seller} />
            </Reveal>
            <Reveal delay={0.14}>
              <SimilarListings items={similar} />
            </Reveal>
          </div>
        </div>
      </main>
    </div>
  );
}
