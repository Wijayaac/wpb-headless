import { SortFilterItem } from '@/lib/constants'
import FilterItemDropdown from '@/components/layout/search/filter/dropdown'
import { FilterItem } from '@/components/layout/search/filter/item'

export type ListItem = SortFilterItem | PathFilterItem
export type PathFilterItem = { title: string; path: string }

function FilterItemList({ list }: { list: ListItem[] }) {
  return (
    <>
      {list.map((item: ListItem, i) => (
        <FilterItem key={i} item={item} />
      ))}
    </>
  )
}

export default function FilterList({ list, title }: { list: ListItem[]; title?: string }) {
  return (
    <>
      <nav>
        {title ? (
          <h3 className="hidden text-xs text-neutral-500">
            {title}
          </h3>
        ) : null}
        <ul className="hidden md:block">
          <FilterItemList list={list} />
        </ul>
        <ul className="md:hidden">
          <FilterItemDropdown list={list} />
        </ul>
      </nav>
    </>
  )
}
