import { ApolloClient, HttpLink, InMemoryCache, DocumentNode } from "@apollo/client";
import { print } from "graphql";
import { cookies } from "next/headers";

function getEndpoint() {
  return (
    process.env.GRAPHQL_URL ??
    process.env.NEXT_PUBLIC_GRAPHQL_URL ??
    process.env.NEXT_PUBLIC_ERXES_ENDPOINT ??
    "/graphql"
  );
}

function getToken() {
  return (
    process.env.ERXES_APP_TOKEN ??
    process.env.NEXT_PUBLIC_ERXES_APP_TOKEN ??
    ""
  );
}

function createApolloClient(token?: string) {
  return new ApolloClient({
    link: new HttpLink({
      uri: getEndpoint(),
      headers: {
        "x-app-token": getToken(),
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
      fetchOptions: { cache: "no-store" },
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: { fetchPolicy: "no-cache" },
      query: { fetchPolicy: "no-cache" },
    },
  });
}

export async function getServerApolloClient() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  return createApolloClient(token);
}

// Fetch-based static client avoids Apollo keeping handles open during `next export`.
class StaticApolloClient {
  async query<T = any>({
    query,
    variables,
  }: {
    query: DocumentNode;
    variables?: Record<string, any>;
  }): Promise<{ data: T }> {
    const res = await fetch(getEndpoint(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-app-token": getToken(),
      },
      body: JSON.stringify({
        query: print(query),
        variables,
      }),
    });

    if (!res.ok) {
      throw new Error(`GraphQL request failed: ${res.status}`);
    }

    const json = await res.json();
    if (json.errors?.length) {
      throw new Error(json.errors[0].message);
    }

    return { data: json.data as T };
  }
}

export function getStaticApolloClient() {
  return new StaticApolloClient() as unknown as ApolloClient;
}
