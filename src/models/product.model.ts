import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    product_id: { type: String, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    sizae: { type: String, required: true }
  },
  { timestamps: true }
)

const productModel = mongoose.model('Product', productSchema)

export default productModel
