const createEditPost = async (event) => {
    event.preventDefault();
    const editPostTitle = document.querySelector('#edit-post-title');
    const editPostBody = document.querySelector('#edit-post-body');
    const postId = document.querySelector('#id-grab')
    console.log(postId)
    
    const editPost = await fetch(`/api/posts/${postId.value}`, {
        method: 'PUT',
        body: JSON.stringify({
                title: editPostTitle.value,
                post_body: editPostBody.value,
                is_updated: 1,
            }),
            headers: { 'Content-Type': 'application/json' },
        })

        if (editPost.ok) {
            document.location.replace('/dashboard');
            } else {
            alert('Failed to Post!');
            }
}

document.querySelector("#edit-post-form").addEventListener('submit', createEditPost)