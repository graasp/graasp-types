import { DatabasePoolType, DatabaseTransactionConnectionType } from 'slonik';
import { FastifyPluginAsync } from 'fastify';
export declare type DatabasePoolHandler = DatabasePoolType;
export declare type DatabaseTransactionHandler = DatabaseTransactionConnectionType;

export interface Database {
    pool: DatabasePoolHandler;
}
interface DatabasePluginOptions {
    uri: string;
    logs: boolean;
}
declare const plugin: FastifyPluginAsync<DatabasePluginOptions>;
export default plugin;
