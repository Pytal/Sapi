export const get = async (route: string) => (
  (await fetch( `/api/${route}` )).json()
)

export const post = async (route: string, json: { [key:string]: any }) => (
  (await fetch( `/api/${route}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(json)
  })).json()
)
