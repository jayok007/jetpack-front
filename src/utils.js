export const encodeImageFile = img => {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.readAsDataURL(img)
    reader.onloadend = () => {
      resolve([img.name, reader.result])
    }
  })
}
