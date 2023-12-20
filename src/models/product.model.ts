import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    product_id: { type: String, unique: true },
    name: { type: String },
    price: { type: Number },
    size: { type: String }
  },
  { timestamps: true }
)

const ProductModel = mongoose.model('Product', productSchema)

export default ProductModel
