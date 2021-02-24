import { DatabaseTransactionConnectionType as TrxHandler } from 'slonik';
import { Member } from './interfaces/member';
import { MemberTaskManager } from './interfaces/member-task-manager';
declare module 'fastify' {
    interface FastifyInstance {
        members: {
            taskManager: MemberTaskManager;
            dbService: MemberService;
        };
    }
}
/**
 * Database's first layer of abstraction for Members
 */
export declare class MemberService {
    private static allColumns;
    /**
     * Get member(s) matching the properties of the given (partial) member.
     * Excludes `extra`, `created_at`, and `updated_at`.
     * @param member Partial member
     * @param dbHandler Database handler
     * @param properties List of Member properties to fetch - defaults to 'all'
     */
    getMatching<T extends Partial<Member>>(member: Partial<Member>, dbHandler: TrxHandler, properties?: (keyof T & string)[]): Promise<T[]>;
    /**
     * Get member matching the given `id` or `null`, if not found.
     * @param id Member's id
     * @param dbHandler Database handler
     * @param properties List of Member properties to fetch - defaults to 'all'
     */
    get<T extends Partial<Member>>(id: string, dbHandler: TrxHandler, properties?: (keyof T & string)[]): Promise<T>;
    /**
     * Create member and return it.
     * @param member Member to create
     * @param transactionHandler Database transaction handler
     */
    create<T extends Member>(member: Partial<Member>, transactionHandler: TrxHandler): Promise<T>;
}
