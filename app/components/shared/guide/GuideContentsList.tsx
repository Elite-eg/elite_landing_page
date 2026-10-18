import { FiCheck } from "react-icons/fi";

export interface GuideContentsListProps {
  title: string;
  items: string[];
}

/** "What's inside?" checklist. */
export function GuideContentsList({ title, items }: GuideContentsListProps) {
  return (
    <div>
      <h2 className="text-base font-bold text-primary">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-content">
            <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-primary text-white">
              <FiCheck className="size-3" aria-hidden="true" />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
