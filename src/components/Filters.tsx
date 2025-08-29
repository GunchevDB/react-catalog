type Props = {
  categories: string[]
  category: string
  setCategory: (c: string) => void
  priceMin: number
  priceMax: number
  range: [number, number]
  setRange: (r: [number, number]) => void
}
export default function Filters({
  categories, category, setCategory,
  priceMin, priceMax, range, setRange
}: Props) {
  return (
    <fieldset style={{ display: 'grid', gap: '.5rem', gridTemplateColumns: '1fr 1fr 1fr' }}>
      <legend className="sr-only">Filters</legend>

      <label>
        Category
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">All</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </label>

      <label>
        Min price
        <input
          type="number"
          inputMode="decimal"
          value={range[0]}
          min={priceMin}
          max={range[1]}
          onChange={e => setRange([Number(e.target.value), range[1]])}
        />
      </label>

      <label>
        Max price
        <input
          type="number"
          inputMode="decimal"
          value={range[1]}
          min={range[0]}
          max={priceMax}
          onChange={e => setRange([range[0], Number(e.target.value)])}
        />
      </label>
    </fieldset>
  )
}
