import {
  Injectable,
} from '@nestjs/common';
import * as qs from 'qs';
import * as http from 'http';

@Injectable()
export class MercureService {
  constructor() {}

  async mercureSendRequest(userId: string, createdProduct: any, request: any){
    const postData = qs.stringify({
      topic: `ping/${userId}`,
      data: JSON.stringify({ data: createdProduct, request}),
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
      });
      req.write(postData);
      req.end();
    } catch (err) {
      console.log(err);
    }
  }

}
