import { UserRoleType } from 'src/typing/types';
export declare const Auth: (role?: UserRoleType) => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
