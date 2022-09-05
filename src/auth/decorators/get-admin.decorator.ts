import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from "@nestjs/common";

export const GetAdmin = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const admin = req.admin;
    if (!admin) {
      throw new HttpException(
        "Admin not found in request",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return !data ? admin : admin[data];
  }
);
