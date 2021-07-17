import { ProductsService } from './product.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserDecorateur } from 'src/decorateur/user.decorator';

@Controller('/products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Get()
  async getAll(@Query('userId') userId: string) {
    return await this.service.findAll(userId);
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post()
  async create(@Body() createProductDto: any, @UserDecorateur() user: any) {
    return await this.service.create(createProductDto, user);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() productDto: any) {
    return await this.service.update(id, productDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.service.deleteOne(id);
  }
}
