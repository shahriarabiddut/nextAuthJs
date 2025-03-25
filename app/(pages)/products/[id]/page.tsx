import React from "react";

export default function Products({ params: { id } }) {
  const product = id;
  return <div>Products Page : {product} </div>;
}
