import { Actor } from '../../../interfaces/actor';
import { UnknownExtra } from '../../../interfaces/extra';
declare module 'fastify' {
    interface FastifyRequest {
        member: Member;
    }
}
export declare enum MemberType {
    Individual = "individual",
    Group = "group"
}
export interface Member<E extends UnknownExtra = UnknownExtra> extends Actor {
    name: string;
    email: string;
    type: MemberType;
    extra: E;
    createdAt: string;
    updatedAt: string;
}
