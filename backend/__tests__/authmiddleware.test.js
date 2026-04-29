const authMiddleware = require('../middleware/authmiddleware');

describe('authMiddleware', () => {
  it('returns 401 when no token provided', () => {
    const req = { header: jest.fn().mockReturnValue(undefined) };
    const status = jest.fn().mockReturnThis();
    const json = jest.fn();
    const res = { status, json };
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(status).toHaveBeenCalledWith(401);
    expect(json).toHaveBeenCalledWith({ message: 'Access denied. No token provided.' });
    expect(next).not.toHaveBeenCalled();
  });
});
