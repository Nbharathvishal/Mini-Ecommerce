import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProductDetail({cartItems, setCartItems }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
  fetch(`${process.env.REACT_APP_API_URL}/products/${id}`)
    .then(res => res.json())
    .then(data => {
        
      setProduct(data.product);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
}, [id]);


function addToCart() {

   const existcartItems = cartItems.find((item) => item.product._id === product._id);

   if(!existcartItems){
  const newCartItems={product,qty};

   setCartItems(state => [...state, newCartItems]);
   toast.success("Cart Items Added Successfully..!");
   }
  }


   function increaseQty(){
    if(product.stock == qty) return;
    setQty(state => state + 1);
}

function decreaseQty(){
    if(qty > 1){
       setQty(state => state - 1);
    } 
  }



  if (loading) return <h2 className="text-center">Loading...</h2>;
  if (!product) return <h2 className="text-center">Product not found</h2>;

  return (
    <div className="container container-fluid">
      <div className="row justify-content-around">
        <div className="col-12 col-lg-5">
          <img
            src={product.images?.[0]?.image}
            alt={product.name}
            height="500"
            width="500"
          />
        </div>

        <div className="col-12 col-lg-5 mt-5">
          <h3>{product.name}</h3>
          <p>Product #{product._id}</p>

          <div className="rating-outer">
            <div
              className="rating-inner"
              style={{ width: `${(product.ratings / 5) * 100}%` }}
            />
          </div>

          <p className="mt-3">${product.price}</p>

          <div className="stockCounter d-inline">
                    <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                    <input type="number" className="form-control count d-inline" value={qty} readOnly />

                    <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                </div>

                <button
                        type="button"
                        onClick={addToCart} disabled={product.stock == 0}
                        id="cart_btn"
                        className="btn btn-primary d-inline ml-4"
                      >
                            Add to Cart
                          </button>

                <hr/>

                <p>Status: <span id="stock_status" className={product.stock > 0 ?'text-success':'text-danger'}>{product.stock > 0 ? "In Stock" : "Out of Stock"}</span></p>

                <hr></hr>
          <p>{product.description}</p>

          <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
				
                <div className="rating w-50"></div>
        </div>
      </div>
    </div>
  );
}
