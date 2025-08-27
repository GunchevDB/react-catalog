import { Link } from "react-router-dom";
import type { Product } from "../lib/types";

export default function ProductCard({ p }: { p: Product }) {
      return (
            <article className="card">
                  <Link to={`/product/${p.id}`} className="media">
                        <img src={p.image} alt={p.title} loading="lazy" />
                  </Link>
                  <div className="body">
                        <h3 className="title">
                              <Link to={`/product/${p.id}`}>{p.title}</Link>
                        </h3>
                        <div className="meta">
                              <span className="price">${p.price.toFixed(2)}</span>
                              <span aria-label={`Rating ${p.rating.rate} out of 5`}>⭐ {p.rating.rate.toFixed(1)}</span>
                        </div>
                  </div>
            </article>
      )
}