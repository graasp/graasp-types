declare module 'fastify' {
    interface FastifyInstance {
        /**
         * Validate session, extract member from it, and set it n `request.member`.
         * Throws exception if it fails.
         */
        validateSession: (request: FastifyRequest, reply: FastifyReply) => void;
        /**
         * Tries to validate session and extract member from it.
         * Does not fail/throw - simply does not set the `member` in `request`.
         */
        fetchSession: (request: FastifyRequest) => void;
    }
}
export interface AuthPluginOptions {
    sessionCookieDomain: string;
    uniqueViolationErrorName?: string;
}
