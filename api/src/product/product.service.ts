import { Product } from './product.interface';
import { Model } from 'mongoose';
import {
  Injectable,
  Inject,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCT_MODEL')
    private productModel: Model<Product>,
  ) {}

  async create(createProductDto: any): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return await createdProduct.save();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException(`Le produit avec l'id ${id} est introuvable`);
    }
    return product;
  }

  async update(id: string, updateProductDto: any): Promise<Product> {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException(`Le produit avec l'id ${id} est introuvable`);
    }

    return await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
  }

  async findAll(userId?: string): Promise<Product[]> {
    const filteredProduct = this.productModel.find({ author: userId });
    if (userId) {
      return filteredProduct;
    }
    return await this.productModel.find().lean();
  }

  async deleteOne(id: string): Promise<any> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      throw new ConflictException(`Impossible de supprimer ce produit`);
    }

    return 1;
  }
}
