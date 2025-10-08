import test from 'node:test';
import assert from 'node:assert/strict';

import { fastify } from "fastify";

export function getServer() {
    const server = new fastify();

    server.route({
        method: 'GET',
        url: '/test/models/:modelId([^:]+)::generateContent',
        handler: async (request, reply) => {
            reply.send(request.params);
        }
    })

    return server;
}

test('modelId parameters is returned correctly', async (t) => {
    const myModelName = 'someModelName'
    
    const server = getServer();
    const response = await server.inject({
        method: 'GET',
        url: `/test/models/${myModelName}:generateContent`
    });

    assert.strictEqual(response.statusCode, 200);
    assert.deepStrictEqual(response.json(), {
        modelId: myModelName,
    })
    
    await server.close();
});
