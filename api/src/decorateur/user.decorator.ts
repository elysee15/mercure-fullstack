import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserDecorateur = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    data = data;
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
