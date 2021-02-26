import { FastifyError } from 'fastify';
declare type ErrorOrigin = 'core' | 'plugin' | string;
export interface GraaspError extends FastifyError {
    data?: unknown;
    origin: ErrorOrigin;
}
export interface GraaspErrorDetails {
    code: string;
    message: string;
    statusCode: number;
}
export declare abstract class BaseGraaspError implements GraaspError {
    name: string;
    code: string;
    statusCode?: number;
    message: string;
    data?: unknown;
    origin: ErrorOrigin;
    constructor({ code, statusCode, message }: GraaspErrorDetails, data?: unknown);
}
export declare class ItemNotFound extends BaseGraaspError {
    constructor(data?: unknown);
}
export declare class UserCannotReadItem extends BaseGraaspError {
    constructor(data?: unknown);
}
export declare class UserCannotWriteItem extends BaseGraaspError {
    constructor(data?: unknown);
}
export declare class UserCannotAdminItem extends BaseGraaspError {
    constructor(data?: unknown);
}
export declare class InvalidMembership extends BaseGraaspError {
    constructor(data?: unknown);
}
export declare class ItemMembershipNotFound extends BaseGraaspError {
    constructor(data?: unknown);
}
export declare class ModifyExisting extends BaseGraaspError {
    constructor(data?: unknown);
}
export declare class InvalidPermissionLevel extends BaseGraaspError {
    constructor(data?: unknown);
}
export declare class HierarchyTooDeep extends BaseGraaspError {
    constructor(data?: unknown);
}
export declare class TooManyChildren extends BaseGraaspError {
    constructor(data?: unknown);
}
export declare class TooManyDescendants extends BaseGraaspError {
    constructor(data?: unknown);
}
export declare class InvalidMoveTarget extends BaseGraaspError {
    constructor(data?: unknown);
}
export declare class MemberNotFound extends BaseGraaspError {
    constructor(data?: unknown);
}
export declare class DatabaseError extends BaseGraaspError {
    constructor(data?: unknown);
}
export declare class UnexpectedError extends BaseGraaspError {
    constructor(data?: unknown);
}
export {};
