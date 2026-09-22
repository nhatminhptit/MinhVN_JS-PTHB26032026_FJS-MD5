import { Controller, Get, Param } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get(':id')
  getProductDetail(@Param('id') id: string) {
    const productData = {
      id: id,
      name: 'Chuột không dây Logitech',
      price: 500000,
      description: 'Hàng chính hãng, bảo hành 12 tháng',
    };

    const _links = [
      { rel: 'self', method: 'GET', href: `/products/${id}` },
      { rel: 'update', method: 'PUT', href: `/products/${id}` },
      { rel: 'delete', method: 'DELETE', href: `/products/${id}` },
      { rel: 'buy', method: 'POST', href: `/products/${id}/buy` },
    ];

    return {
      data: productData,
      _links: _links,
    };
  }
}
