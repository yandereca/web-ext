/**
 * returns random element from the given array.
 *
 * @param array array.
 */
export const randomPick = <T>(array: T[]): T => {
  const i = Math.floor(Math.random() * (array.length - 1))

  return array[i]
}
