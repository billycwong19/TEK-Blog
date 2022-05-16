const deletePost = async (event) => {
    const postId = document.querySelector('#id-grab')
    event.preventDefault();
    const postDelete = await fetch(`/api/posts/${postId.value}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
    if (postDelete.ok) {
        document.location.replace('/dashboard');
        } else {
        alert('Failed to Post!');
        }
}

document.querySelector('#delete-button').addEventListener('click', deletePost)