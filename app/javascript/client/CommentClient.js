export function getComments() {
  return fetch('/comments.json')
  .then((response) => {
    return response.json();
  }) 
};

export function createComment(newComment) {
  let token = document.head.querySelector("[name=csrf-token]").content;
  let body = JSON.stringify({comment: newComment});
  return fetch('/comments', {
    method: 'post',
    body: body,
    headers: {
      'X-CSRF-Token': token,
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  })
  .then((response) => {
    return response.json()
  })
}

export function deleteComment(event) {
  event.preventDefault();
  let token = document.head.querySelector("[name=csrf-token]").content;
  let id = event.target.getAttribute('id')

  return (
    fetch(`comments/${id}.json`, {
      method: 'delete',
      body: JSON.stringify({"id": id}),
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then((response) => {
      return response.json()
    })
  )
}
