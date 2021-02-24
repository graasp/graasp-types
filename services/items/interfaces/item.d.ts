import { UnknownExtra } from '../../../interfaces/extra';
export interface Item<T extends UnknownExtra = UnknownExtra> {
    id: string;
    name: string;
    description: string;
    type: string;
    path: string;
    extra: T;
    creator: string;
    createdAt: string;
    updatedAt: string;
}
