declare module 'multicast-dns' {
  interface Query {
    questions: Array<{
      name: string;
      type: string;
      class?: string;
    }>;
  }

  interface Response {
    answers: Array<{
      name: string;
      type: string;
      ttl: number;
      data: any;
    }>;
  }

  interface MDNS {
    on(event: 'query', listener: (query: Query) => void): this;
    on(event: 'response', listener: (response: Response) => void): this;
    query(query: Query): void;
    respond(response: Response): void;
    destroy(): void;
  }

  function mdns(): MDNS;
  export = mdns;
} 