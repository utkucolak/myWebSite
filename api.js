import fetch from "isomorphic-unfetch";

async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(`https://api.github.com/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${process.env.GH_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export async function getPDF() {
  const data = await fetchAPI(`
    query { 
        repository(name: "myWebSite", owner: "utkucolak") {
        filename: object(expression: "master:res/") {
          ... on Tree {
            entries {
              name
            }
          }
        }
      }
    }`);
  return data?.repository;
}
