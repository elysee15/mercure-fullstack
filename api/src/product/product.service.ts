import { Product } from './product.interface';
import { Model } from 'mongoose';
import {
  Injectable,
  Inject,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import * as qs from 'qs';
import * as http from 'http'
@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCT_MODEL')
    private productModel: Model<Product>,
  ) {}

  async create(createProductDto: any, user: any) {
    const createdProduct = new this.productModel(createProductDto);
    createdProduct['author'] = user['_id'];
    const postData = qs.stringify({
      'topic': `ping/${user['_id']}`,
      'data': JSON.stringify({ data: createdProduct }),
  });
  try {
    const req = await http.request({
      hostname: 'localhost',
      port: '8001',
      path: '/.well-known/mercure',
      method: 'POST',
      headers: { 
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOlsiKiJdfX0.ky_2ZpDtBh2x-vqs6STXDjCbuB7cL0c1NIG-SxITei4`,
        'Content-Length': Buffer.byteLength(postData),
      },

    })
    req.write(postData);
    req.end();
} catch (err) {
    console.log(err);
}
    // return await createdProduct.save();
  }

  async findOne(id: string): Promise<Product> {
    const product = await (await this.productModel.findById(id))
      .populate({ path: 'author', select: '_id' })
      .populate({ path: 'author', select: 'name' })
      .execPopulate();
    console.log(product);
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
    return await this.productModel.find();
  }

  async deleteOne(id: string): Promise<any> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      throw new ConflictException(`Impossible de supprimer ce produit`);
    }

    return 1;
  }
}
