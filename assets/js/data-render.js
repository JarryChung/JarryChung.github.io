(function () {
  const books = window._page_.books
  const container = document.querySelector('#container')
  const createEle = (tag) => document.createElement(tag)
  books.forEach(book => {
    const card = createEle('div')
    card.className = 'card'

    const imgBox = createEle('div')
    imgBox.className = 'img__box'
    const img = createEle('img')
    img.src = book.img
    img.alt = book.title
    imgBox.appendChild(img)

    const contentBox = createEle('div')
    contentBox.className = 'content__box'
    const h2 = createEle('h2')
    h2.innerText = book.title
    const p = createEle('p')
    p.innerText = book.info
    const a = createEle('a')
    a.href = book.url
    const span = createEle('span')
    span.innerText = book.btn
    a.appendChild(span)
    contentBox.appendChild(h2)
    contentBox.appendChild(p)
    contentBox.appendChild(a)

    card.appendChild(imgBox)
    card.appendChild(contentBox)
    container.appendChild(card)
  })
})()
