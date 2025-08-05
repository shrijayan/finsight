// Mock for next/server
class NextRequest extends global.Request {
  constructor(url, options = {}) {
    super(url, options);
    this.nextUrl = { pathname: new URL(url).pathname };
    this.geo = {};
    this.ip = '127.0.0.1';
  }
  
  async formData() {
    return this.body;
  }
}

class NextResponse extends global.Response {
  constructor(body, init = {}) {
    super(body, init);
  }
  
  static json(object, init = {}) {
    return new NextResponse(JSON.stringify(object), {
      status: init.status || 200,
      statusText: init.statusText,
      headers: {
        'content-type': 'application/json',
        ...init.headers,
      },
    });
  }
  
  static redirect(url, init = {}) {
    return new NextResponse(null, {
      status: init.status || 307,
      headers: {
        location: url,
        ...init.headers,
      },
    });
  }
  
  static next(init = {}) {
    return new NextResponse(null, {
      status: 200,
      ...init,
    });
  }
}

module.exports = {
  NextRequest,
  NextResponse,
  userAgent: jest.fn(() => ({ browser: { name: 'test' } })),
};
