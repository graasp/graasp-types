import { ObjectSchema } from 'fluent-json-schema';
import { DatabaseTransactionConnectionType as TrxHandler, ValueExpressionType } from 'slonik';
import { UnknownExtra } from '../../interfaces/extra';
import { Item } from './interfaces/item';
import { ItemTaskManager } from './interfaces/item-task-manager';
declare module 'fastify' {
    interface FastifyInstance {
        items: {
            taskManager: ItemTaskManager;
            dbService: ItemService;
            extendCreateSchema: (itemTypeSchema?: ObjectSchema) => void;
            extendExtrasUpdateSchema: (itemTypeSchema?: ObjectSchema) => void;
        };
    }
}
/**
 * Database's first layer of abstraction for Items
 */
export declare class ItemService {
    private static allColumns;
    private static allColumnsForJoins;
    /**
     * Get item matching the given `id` or `null`, if not found.
     * @param id Item id
     * @param transactionHandler Database transaction handler
     */
    get<E extends UnknownExtra>(id: string, transactionHandler: TrxHandler): Promise<Item<E>>;
    /**
     * Get item matching the given `path` or `null`, if not found.
     * @param path Item path
     * @param transactionHandler Database transaction handler
     */
    getMatchingPath<E extends UnknownExtra>(path: string, transactionHandler: TrxHandler): Promise<Item<E>>;
    /**
     * Get items matching the given `ids` or `[]`, if none is found.
     * @param ids Item ids
     * @param transactionHandler Database transaction handler
     */
    getMany(ids: string[], transactionHandler: TrxHandler): Promise<readonly Item[]>;
    /**
     * Create given item and return it.
     * @param item Item to create
     * @param transactionHandler Database transaction handler
     */
    create<E extends UnknownExtra>(item: Partial<Item<E>>, transactionHandler: TrxHandler): Promise<Item<E>>;
    /**
     * Update item with given changes and return it.
     * @param id Item id
     * @param data Item changes
     * @param transactionHandler Database transaction handler
     */
    update<E extends UnknownExtra>(id: string, data: Partial<Item<E>>, transactionHandler: TrxHandler): Promise<Item<E>>;
    buildColumnsForUpdate<E extends UnknownExtra>(key: string, data: Partial<Item<E>>): ValueExpressionType;
    /**
     * Delete item matching the given `id`. Return item, or `null`, if delete has no effect.
     *
     * Item memberships targeting this item are "CASCADE DELETEd" in the database.
     * @see database_schema.sql
     * @param id Item id
     * @param transactionHandler Database transaction handler
     */
    delete<E extends UnknownExtra>(id: string, transactionHandler: TrxHandler): Promise<Item<E>>;
    /**
     * Get number of children of given item.
     * @param item Item's children to count
     * @param transactionHandler Database transaction handler
     */
    getNumberOfChildren(item: Item, transactionHandler: TrxHandler): Promise<number>;
    /**
     * Get children of given item.
     * @param item Item's children to fetch
     * @param transactionHandler Database transaction handler
     */
    getChildren(item: Item, transactionHandler: TrxHandler): Promise<readonly Item[]>;
    /**
     * Get number of descendants (at any depth) of given item.
     * @param item Item whose descendants are to count
     * @param transactionHandler Database transaction handler
     */
    getNumberOfDescendants(item: Item, transactionHandler: TrxHandler): Promise<number>;
    /**
     * Get item's descendants, from `levels` below, ordered by their depth/level in the
     * tree, with the given `direction`.
     *
     * @param item Item whose descendants shoud be considered
     * @param transactionHandler Database transaction handler
     * @param direction Order direction based on item depth in the tree
     * * `ASC`: items higher in the tree first
     * * `DESC`: deepest items in the tree first
     * @param levels Levels down the tree to fetch - positive integer or `ALL`; defaults to `ALL`
     * * `1`: children
     * * `2`: children + grandchildren
     * * `3`: children + grandchildren + great-grandchildren
     * @param properties List of Item properties to fetch - returns all if not defined.
     */
    getDescendants(item: Item, transactionHandler: TrxHandler, direction?: 'ASC' | 'DESC', levels?: number | 'ALL', properties?: (keyof Item)[]): Promise<Item[]>;
    /**
     * Get number of levels to farthest child.
     * @param item Item from where to start
     * @param transactionHandler Database transaction handler
     */
    getNumberOfLevelsToFarthestChild(item: Item, transactionHandler: TrxHandler): Promise<number>;
    /**
     * Get `member`'s own items (created by member and where member is `admin`)
     * @param memberId Member's id
     * @param transactionHandler Database transaction handler
     * TODO: does this make sense here? Should this be part of different (micro)service??
     */
    getOwn(memberId: string, transactionHandler: TrxHandler): Promise<Item[]>;
    /**
     * Get items "shared with" `member` - "highest" items in the membership tree where `member`
     * is not admin or `member` is admin but not the item creator
     * @param memberId Member's id
     * @param transactionHandler Database transaction handler
     * TODO: does this make sense here? Should this be part of different (micro)service??
     */
    getSharedWith(memberId: string, transactionHandler: TrxHandler): Promise<Item[]>;
    /**
     * Get list of members (ids) that *might* have item with given `itemPath` in their shared items.
     * @param itemPath Item path
     * @param transactionHandler Database transaction handler
     * @returns Array of memberIds (empty or w/ memberIds/strings)
     */
    membersWithSharedItem(itemPath: string, transactionHandler: TrxHandler): Promise<readonly string[]>;
    /**
     * Move item, and its underlying tree, below another item.
     * Or make it a "new" tree if `parentItem` is not provided.
     *
     * (Paths in memberships will be updated automatically -
     * ON UPDATE CASCADE in item_membership's fk from `item_path` to item's `path`)
     * @param item Item to move
     * @param transactionHandler Database transaction handler
     * @param parentItem Destination item
     */
    move(item: Item, transactionHandler: TrxHandler, parentItem?: Item): Promise<void>;
}
