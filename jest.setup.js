import '@testing-library/jest-dom'

// Web API polyfills for Next.js API routes
const { TextEncoder, TextDecoder } = require('util')

// Set up basic globals that Next.js expects
Object.assign(global, {
  TextEncoder,
  TextDecoder,
  Request: class Request {
    constructor(url, options = {}) {
      this.url = url
      this.method = options.method || 'GET'
      this.headers = new Map(Object.entries(options.headers || {}))
      this.body = options.body
    }
    
    async json() {
      if (typeof this.body === 'string') {
        try {
          return JSON.parse(this.body)
        } catch (error) {
          throw new Error('Invalid JSON')
        }
      }
      throw new Error('No JSON body')
    }
    
    async formData() {
      if (this.body instanceof FormData) {
        return this.body
      }
      throw new Error('Not form data')
    }
  },
  
  Response: class Response {
    constructor(body, options = {}) {
      this.body = body
      this.status = options.status || 200
      this.headers = new Map(Object.entries(options.headers || {}))
    }
    
    async json() {
      return JSON.parse(this.body)
    }
    
    static json(data, init = {}) {
      return new Response(JSON.stringify(data), {
        status: init.status || 200,
        headers: { 'Content-Type': 'application/json', ...init.headers }
      })
    }
  },
  
  Headers: class Headers {
    constructor(init = {}) {
      this.map = new Map(Object.entries(init))
    }
    
    get(name) {
      return this.map.get(name.toLowerCase())
    }
    
    set(name, value) {
      this.map.set(name.toLowerCase(), value)
    }
  },
  
  FormData: class FormData {
    constructor() {
      this.data = new Map()
    }
    
    append(name, value) {
      if (!this.data.has(name)) {
        this.data.set(name, [])
      }
      this.data.get(name).push(value)
    }
    
    entries() {
      const entries = []
      for (const [key, values] of this.data) {
        for (const value of values) {
          entries.push([key, value])
        }
      }
      return entries[Symbol.iterator]()
    }
  },
  
  File: class File {
    constructor(chunks, filename, options = {}) {
      this.name = filename
      this.type = options.type || ''
      this.size = chunks.reduce((size, chunk) => size + (typeof chunk === 'string' ? chunk.length : chunk.byteLength), 0)
    }
  }
})
