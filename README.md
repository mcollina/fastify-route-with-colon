# Problem Statement

When integrating with a third-party API, we encountered an issue defining routes in Fastify (specifically with the `find-my-way` router). 

The API endpoints use URLs with a colon (`:`) character immediately after a path parameter, for example:

```
/test/models/MODEL_ID:generateContent
/test/models/MODEL_ID:streamGenerateContent
```

We attempted to define a Fastify route as follows:

```js
server.route({
    method: 'GET',
    url: '/test/models/:modelId::generateContent',
    handler: async (request, reply) => {
        reply.send(request.params);
    }
})
```

However, when making a request to:

```
/test/models/gemini-2.5-pro:generateContent
```

The parameters received by the handler are:

```json
{
    "modelId::generateContent": "gemini-2.5-pro:generateContent"
}
```

Instead of the expected:

```json
{
    "modelId": "gemini-2.5-pro"
}
```