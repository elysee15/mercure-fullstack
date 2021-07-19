import { Product } from './product.interface';
import { Model } from 'mongoose';
import {
  Injectable,
  Inject,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { MercureService } from '../utils/mercure-send-request';
@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCT_MODEL')
    private productModel: Model<Product>,
    private mercureService: MercureService
  ) {}

  async create(createProductDto: any, user: any, req: any) {
    const createdProduct = new this.productModel(createProductDto);
    createdProduct['author'] = user['_id'];
    await this.mercureService.mercureSendRequest(user['_id'], createdProduct, req.method)
    return await createdProduct.save();
  }

  async findOne(id: string): Promise<Product> {
    const product = await (await this.productModel.findById(id))
      .populate({ path: 'author', select: '_id' })
      .populate({ path: 'author', select: 'name' })
      .execPopulate();
    if (!product) {
      throw new NotFoundException(`Le produit avec l'id ${id} est introuvable`);
    }
    return product;
  }

  async update(id: string, updateProductDto: any, user: any,  req: any): Promise<Product> {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException(`Le produit avec l'id ${id} est introuvable`);
    }
    const productUpdated = await this.productModel
    .findByIdAndUpdate(id, updateProductDto, { new: true })
    .exec();
    await this.mercureService.mercureSendRequest(user['_id'], productUpdated, req.method)
    return productUpdated;
  }

  async findAll(userId?: string): Promise<Product[]> {
    const filteredProduct = this.productModel.find({ author: userId });
    if (userId) {
      return filteredProduct;
    }
    return await this.productModel.find();
  }

  async deleteOne(id: string, user: any, req: any): Promise<any> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      throw new ConflictException(`Impossible de supprimer ce produit`);
    }
    await this.mercureService.mercureSendRequest(user['_id'], deletedProduct, req.method)
    return 1;
  }
}
