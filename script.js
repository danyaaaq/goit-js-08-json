const input = document.getElementById('bookmarkInput')
const addBtn = document.getElementById('addBookmarkBtn')
const list = document.getElementById('bookmarkList')

let bookmarks = JSON.parse(localStorage.getItem('myBookmarks')) || []

function renderBookmarks() {
  list.innerHTML = ''

  bookmarks.forEach((url, index) => {
    const li = document.createElement('li')

    const link = document.createElement('a')
    link.href = url
    link.textContent = url
    link.target = '_blank'

    const button = document.createElement('button')
    button.className = 'delete'
    button.textContent = 'X'
    button.dataset.id = index

    li.append(link, button)
    list.appendChild(li)
  })
}
function addBookmark() {
  const url = input.value.trim()

  if (url === '') return

  bookmarks.push(url)
  localStorage.setItem('myBookmarks', JSON.stringify(bookmarks))

  input.value = ''
  renderBookmarks()
}
function deleteBookmark(event) {
  if (event.target.classList.contains('delete')) {
    const index = Number(event.target.dataset.id)

    bookmarks.splice(index, 1)

    localStorage.setItem('myBookmarks', JSON.stringify(bookmarks))
    renderBookmarks()
  }
}
addBtn.addEventListener('click', addBookmark)
list.addEventListener('click', deleteBookmark)
renderBookmarks()