export type SortKey = 'price-asc' | 'price-desc'

export default function SortMenu({
  value, onChange
}: { value: SortKey; onChange: (v: SortKey) => void }) {
  return (
    <label>
      Sort
      <select value={value} onChange={e => onChange(e.target.value as SortKey)} aria-label="Sort products">
        <option value="price-asc">Price ↑</option>
        <option value="price-desc">Price ↓</option>
      </select>
    </label>
  )
}
