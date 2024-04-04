
console.log('content-script: sub-emoji.js');

let emojis = { apple: '🍎', banana: '🍌', bang: '💥', baseball: '⚾', basketball: '🏀', beer: '🍺', bicycle: '🚴', bike: '🚴', bomb: '💣', boy: '👦', bug: '🐛', burger: '🍔', burn: '🔥', cake: '🎂', candy: '🍬', cat: '🐱', celebration: '🎉', cheeseburger: '🍔', cookie: '🍪', cool: '😎', cry: '😢', dog: '🐶', doge: '🐕', earth: '🌎', explode: '💥', fart: '💨', fast: '💨', female: '👩', fire: '🔥', fish: '🐟', flame: '🔥', flower: '🌹', food: '🍕', football: '🏈', girl: '👧', golf: '⛳', hamburger: '🍔', happy: '😀', horse: '🐴', hot: '🔥', kiss: '😘', laugh: '😂', lit: '🔥', lock: '🔒', lol: '😂', love: '😍', male: '👨', man: '👨', monkey: '🐵', moon: '🌙', note: '📝', paint: '🎨', panda: '🐼', party: '🎉', pig: '🐷', pizza: '🍕', planet: '🌎', rose: '🌹', rofl: '😂', sad: '😢', sleep: '😴', smile: '😀', smiley: '😀', soccer: '⚽', star: '⭐', sun: '☀️', sunglasses: '😎', surprised: '😮', tree: '🌲', trophy: '🏆', win: '🏆', wind: '💨', wine: '🍷', wink: '😉', woman: '👩', world: '🌎', wow: '😮' };

// sort by length of word to avoid replacing substrings
emojis = Object.keys(emojis).sort().reduce((o, w) => (o[w] = emojis[w], o), {});

function replaceText(node) { // this handles the replacements

  if (node.nodeType === Node.TEXT_NODE) {

    // skip textareas to be safe with forms
    if (node?.parentNode.nodeName === 'TEXTAREA') return;

    // replace each 'word' with its emoji
    let text = node.textContent;
    Object.entries(emojis).forEach(([word, emoji]) => {
      text = text.replaceAll(word, emoji);
    });
    node.textContent = text;
  }
  else {
    // node has children, call replaceText() recursively
    node.childNodes.forEach(replaceText);
  }
}
replaceText(document.body); // call our function, starting from body tag


