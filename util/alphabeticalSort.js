export default function (a, b, property) {
  let x
  let y

  if (property) {
    x = a[property].toLowerCase()
    y = b[property].toLowerCase()
  } else {
    x = a.toLowerCase()
    y = b.toLowerCase()
  }

  return x.localeCompare(y)
}
