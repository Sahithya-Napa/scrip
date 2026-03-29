export default function Filters({ categories, selected, setSelected }) {
  return (
    <div className="filters">
      <h2>Categories</h2>

      <ul>
        <li
          className={selected === 'all' ? 'active' : ''}
          onClick={() => setSelected('all')}
        >
          All
        </li>

        {categories.map((cat) => (
          <li
            key={cat}
            className={selected === cat ? 'active' : ''}
            onClick={() => setSelected(cat)}
          >
            {cat}
          </li>
        ))}
      </ul>
    </div>
  )
}