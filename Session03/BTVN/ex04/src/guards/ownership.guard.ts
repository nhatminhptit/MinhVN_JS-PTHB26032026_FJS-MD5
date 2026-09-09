import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";


@Injectable()
export class OwnershipGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();

        request.user = { id: '1'};

        const userId = request.user.id;
        const resourceId = request.params.id;

        console.log(
          `UserID: ${userId} đang thao tác với ResourceID: ${resourceId}`,
        );

        if (userId !== resourceId) {
          throw new ForbiddenException(
            'Bạn không có quyền thao tác trên tài nguyên của người khác!',
          );
        }

        return true;
    }
}