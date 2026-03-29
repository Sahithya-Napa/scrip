import { useState } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import Filters from '../components/Filters'

export async function getServerSideProps() {
  const res = await fetch('https://fakestoreapi.com/products')
  const products = await res.json()

  return {
    props: { products },
  }
}

export default function Home({ products }) {
  const [selected, setSelected] = useState('all')
  const [sort, setSort] = useState('default')

  const categories = [...new Set(products.map(p => p.category))]

  const filteredProducts =
    selected === 'all'
      ? products
      : products.filter(p => p.category === selected)

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === 'low') return a.price - b.price
    if (sort === 'high') return b.price - a.price
    return 0
  })

  return (
    <>
      <Head>
        <title>Buy Products Online | My Store</title>
        <meta name="description" content="Best products at affordable prices" />

        {/* Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "Product Listing",
            }),
          }}
        />
      </Head>

      <Header />

      <main className="layout">
        <Filters
          categories={categories}
          selected={selected}
          setSelected={setSelected}
        />

        <div className="products-section">
          <div className="top-bar">
            <h1>All Products</h1>

            <select onChange={(e) => setSort(e.target.value)}>
              <option value="default">Sort</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>

          <div className="grid">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}