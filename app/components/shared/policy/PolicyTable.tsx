import { cn } from "@/lib/utils";
import type { PolicyTableContent } from "./policiesData";

export interface PolicyTableProps {
  table: PolicyTableContent;
}

/**
 * Navy header row, striped body rows. The first column labels each row (a row header) and keeps the
 * Figma's 220px from `sm` up; the other columns share the rest. Scrolls sideways if a cell can't wrap.
 */
export function PolicyTable({ table }: PolicyTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-edge">
      <table className="w-full table-fixed border-collapse text-caption">
        <thead className="bg-primary-dark text-white">
          <tr>
            {table.columns.map((column, index) => (
              <th
                key={column}
                scope="col"
                className={cn("px-3 py-3 text-start font-medium leading-snug sm:px-4", index === 0 && "sm:w-[13.75rem]")}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {table.rows.map(([label, ...cells]) => (
            <tr key={label} className="even:bg-surface-alt">
              <th scope="row" className="px-3 py-3 text-start font-medium leading-snug text-body sm:px-4">
                {label}
              </th>
              {cells.map((cell, index) => (
                <td key={index} className="px-3 py-3 text-ink-700 sm:px-4">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
