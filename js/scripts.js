
// Add event to button generator
const contentBox = document.getElementById('content')
document.getElementById('baconGenerator').addEventListener('click', () => {
  let p = document.createElement('p')
  p.innerHTML = textGen.next()
  contentBox.appendChild(p)
})

// Request random text from API and store into array
const textGen = new (function() {

  // Attributes
  const ITEMS_COUNT = 20
  let _randomTexts = ['NO BACON YET!']
  let _current = 0

  // Constructor
  axios.get(`https://baconipsum.com/api/?type=all-meat&paras=${ITEMS_COUNT}&start-with-lorem=1`).then(res => _randomTexts = res.data)

  // Method to get next
  this.next = () => {
    let curr = _current
    _current = ++_current % ITEMS_COUNT
    return _randomTexts[curr]
  }
})()
