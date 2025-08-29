type Props = { value: string; onChange: (v: string) => void }
export default function SearchBox({ value, onChange }: Props) {
      return (
            <label style={{ display: 'block' }}>
                  <span className="sr-only">Search products</span>
                  <input
                        aria-label="Search products"
                        placeholder="Search products"
                        value={value}
                        onChange={e => onChange(e.target.value)}
                        style={{ width: '100%', padding: '0.5em', fontSize: '1em' }}
                  />
            </label>
      )
}