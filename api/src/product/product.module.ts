import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ProductsController } from './product.controller';
import { productsProviders } from './product.providers';
import { ProductsService } from './product.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductsController],
  providers: [ProductsService, ...productsProviders],
})
export class ProductsModule {}
