import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MercureService } from 'src/utils/mercure-send-request';
import { DatabaseModule } from '../database/database.module';
import { ProductsController } from './product.controller';
import { productsProviders } from './product.providers';
import { ProductsService } from './product.service';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: 'bleu',
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, MercureService, ...productsProviders],
})
export class ProductsModule {}
