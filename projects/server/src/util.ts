export function clearUndefinedOrNull<T>(obj: T, stripKeys: (keyof T)[] = []): T {
  const newObj: Record<any, any> = {}
  for (let key in obj) {
    if (obj[key] === undefined || obj[key] === null || stripKeys.includes(key))
      continue
    newObj[key] = obj[key]
  }
  return newObj
}