import { Container } from "@/app/components/shared/Container";
import type { AddonsPage } from "@/lib/addons";
import { ADDONS_RESULTS_ID } from "../data/addonsStoreData";
import { AddonCategoryFilter } from "./AddonCategoryFilter";
import { AddonGrid } from "./AddonGrid";
import { AddonsEmptyState } from "./AddonsEmptyState";
import { AddonsPagination } from "./AddonsPagination";
import { AddonsToolbar } from "./AddonsToolbar";

export interface AddonsBrowserProps {
  result: AddonsPage;
  /** Changes with the query, so the grid swaps its cards when new results arrive. */
  filterKey: string;
}

/** Category pills, then the results: count + filters, the cards (or the empty state) and the pages. */
export function AddonsBrowser({ result, filterKey }: AddonsBrowserProps) {
  return (
    <section className="pb-16 pt-8 sm:pb-20">
      <Container className="flex flex-col gap-8">
        <AddonCategoryFilter counts={result.categoryCounts} />

        <div id={ADDONS_RESULTS_ID} className="flex flex-col gap-5">
          <AddonsToolbar total={result.total} developers={result.developers} />
          {result.items.length > 0 ? <AddonGrid items={result.items} filterKey={filterKey} /> : <AddonsEmptyState />}
          <AddonsPagination pageCount={result.pageCount} total={result.total} />
        </div>
      </Container>
    </section>
  );
}
