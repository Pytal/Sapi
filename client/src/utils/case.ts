const toSnake = (str: string) => (
  str.replace( /[A-Z]/g, a => `_${a.toLowerCase()}` )
)

export const toSnakeKeys = (obj: { [key:string]: any }) => {
  const newObj: any = {}
  for (const key in obj) { newObj[toSnake(key)] = obj[key] }
  return newObj
}
