console.log('sub-emoji.js injected as content-script');

let emojis = { apple: '🍎', banana: '🍌', bang: '💥', baseball: '⚾', basketball: '🏀', beer: '🍺', bicycle: '🚴', bike: '🚴', bomb: '💣', boy: '👦', bug: '🐛', burger: '🍔', burn: '🔥', cake: '🎂', candy: '🍬', cat: '🐱', celebration: '🎉', cheeseburger: '🍔', cookie: '🍪', cool: '😎', cry: '😢', dog: '🐶', doge: '🐕', earth: '🌎', explode: '💥', fart: '💨', fast: '💨', female: '👩', fire: '🔥', fish: '🐟', flame: '🔥', flower: '🌹', food: '🍕', football: '🏈', girl: '👧', golf: '⛳', hamburger: '🍔', happy: '😀', horse: '🐴', hot: '🔥', kiss: '😘', laugh: '😂', lit: '🔥', lock: '🔒', lol: '😂', love: '😍', male: '👨', man: '👨', monkey: '🐵', moon: '🌙', note: '📝', paint: '🎨', panda: '🐼', party: '🎉', pig: '🐷', pizza: '🍕', planet: '🌎', rose: '🌹', rofl: '😂', sad: '😢', sleep: '😴', smile: '😀', smiley: '😀', soccer: '⚽', star: '⭐', sun: '☀️', sunglasses: '😎', surprised: '😮', tree: '🌲', trophy: '🏆', win: '🏆', wind: '💨', wine: '🍷', wink: '😉', woman: '👩', world: '🌎', wow: '😮' };

// sort by length of word to avoid replacing substrings
emojis = Object.keys(emojis).sort().reduce((obj, key) => (obj[key] = emojis[key], obj), {});

// create an object with regexs for each word { word: regex }
let regexs = Object.keys(emojis).reduce((obj, word) => (obj[word] = new RegExp('\\b' + word + '\\b', 'gi'), obj), {});

function replaceText(node) { // handles all the replacements

  if (node.nodeType === Node.TEXT_NODE) {

    // skip textareas to be safe with forms
    if (node?.parentNode.nodeName === 'TEXTAREA') return;

    // use 'regexs' to replace each 'word' with its emoji
    let text = node.textContent;
    Object.entries(emojis).forEach(([word, emoji]) => {
      text = text.replace(regexs[word], emoji);
    });
    node.textContent = text;
  }
  else {
    // node has children, call replaceText() recursively
    node.childNodes.forEach(replaceText);
  }
}

// apply our code to any new nodes added to the page
new MutationObserver(muts => muts.forEach
  (mut => mut?.addedNodes.forEach(node => replaceText(node))))
  .observe(document.body, { childList: true, subtree: true });


replaceText(document.body); // start from the body tag



