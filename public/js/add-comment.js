// add comment fetch
const createComment = async (event) => {
    event.preventDefault()
    const postId = document.querySelector('#post-id-grab')
    const comment = document.querySelector('#comment-body')
    const newComment = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
            post_id: postId.value,
            comment_body: comment.value,
        }),
        headers: { 'Content-Type': 'application/json' },
    })
    if (newComment.ok) {
        document.location.replace(`/single-post/${postId.value}`);
        } else {
        alert('Failed to Post!');
        }
}

document.querySelector('#comment-form').addEventListener('submit', createComment)

