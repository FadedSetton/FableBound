import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { AuthenticationError } from 'apollo-server-express';

const secret = process.env.JWT_SECRET_KEY || 'your_secret_key';
const expiration = '2h';

interface Payload {
    _id: string;
    username: string;
    email: string;
}

export const signToken = ({ _id, username, email }: Payload): string => {
    const payload = { _id, username, email };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

export const authMiddleware = ({ req }: { req: Request }) => {
    let token = req.headers.authorization || '';

    if (token.startsWith('Bearer ')) {
        token = token.slice(7).trim();
    }

    if(!token) return req;

    try {
        const decoded = jwt.verify(token, secret) as Payload;
        (req as any).user = (decoded as any).data;
    }catch (err) {
        console.error('Invalid token', err);
        throw new AuthenticationError('Invalid token');
    }

    return req;
};

