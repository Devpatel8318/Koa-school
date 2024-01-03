import { ObjectId } from 'mongodb'

const validId = async (ctx, next) => {
    const { id } = ctx.params;

    if (!ObjectId.isValid(id)) {
        ctx.status = 400;
        ctx.body = { error: 'Invalid ID' };
    } else {
        ctx.params.id = new ObjectId(id);
        await next();
    }
};

export default validId;
