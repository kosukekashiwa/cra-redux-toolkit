import { ResponseResolver, MockedRequest, restContext } from 'msw';

const get: ResponseResolver<MockedRequest, typeof restContext> = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json([
      { id: 0, title: 'title-0', author: { id: 0, name: 'name-0' } },
      { id: 1, title: 'title-1', author: { id: 1, name: 'name-1' } },
      { id: 2, title: 'title-2', author: { id: 1, name: 'name-1' } },
    ]),
  );
};

export default { get };
