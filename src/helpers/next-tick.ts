/**
 * next tick helper
 * @param cb {function}
 */
export const nextTick = (cb?: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      cb && cb()
      resolve(true)
    }, 0)
  })
}

export default {
  nextTick
}
