export default async function delay(timeMS: number) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined)
    }, timeMS)
  })
}
