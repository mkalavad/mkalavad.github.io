// You may wish to find an effective randomizer function on MDN.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
}

function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function sortFunction(a, b, key) {
  if (a[key] < b[key]) {
    return -1;
  } if (a[key] > b[key]) {
    return 1;
  }
  return 0;
}

document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {
      // You're going to do your lab work in here. Replace this comment.
      const country = range(10);
      const country2 = country.map(() => {
        const number = getRandomIntInclusive(0, 243);
        return fromServer[number];

      });

      const reverse = country2.sort((a, b)=> sortFunction(a, b, 'name'));
      const ol = document.createElement('ol');
      ol.className = 'flex-inner';
      $('form').prepend(ol);

      reverse.forEach((el, i) => {
        const li = document.createElement('li');
        $(li).append(`<input type="checkbox" value=${el.code} id=${el.code} />`);
        $(li).append(`<label for=${el.code}>${el.name}</label>`);
        $(ol).append(li);
      });
      //console.log('fromServer', fromServer);
    })
    .catch((err) => console.log(err));
});