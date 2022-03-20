import { Link } from "gatsby"
import React from "react"

function SinglePizza({ pizza }) {
  return (
    <div>
      <Link to={`/pizzas/${pizza.slug.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
      </Link>
    </div>
  )
}
function PizzaList({ pizzas }) {
  console.log(pizzas)
  return (
    <>
      {pizzas.map(p => (
        <SinglePizza key={p.key} pizza={p} />
      ))}
    </>
  )
}

export default PizzaList
