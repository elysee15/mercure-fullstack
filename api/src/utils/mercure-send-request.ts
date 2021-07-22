import {
  Injectable,
} from '@nestjs/common';
import * as qs from 'qs';
import * as http from 'http';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MercureService {
  constructor(
    private jwtService: JwtService
  ) {}

  async mercureSendRequest(userId: string, createdProduct: any, request: any){
    const postData = qs.stringify({
      topic: `ping/${userId}`,
      data: JSON.stringify({ data: createdProduct, request}),
    });
    const payload = {
      "mercure": {
        "publish": ["*"]
      }
    }
    const tokenMercure = this.jwtService.sign(payload);
    try {
      const req = await http.request({
        hostname: 'localhost',
        port: '8001',
        path: '/.well-known/mercure',
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${tokenMercure}`,
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
