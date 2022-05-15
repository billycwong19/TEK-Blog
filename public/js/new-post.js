const createNewPost = async (event) => {
    event.preventDefault();
    const newPostTitle = document.querySelector('#new-post-title');
    const newPostBody = document.querySelector('#new-post-body');
    
    const newPost = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
                title: newPostTitle.value,
                post_body: newPostBody.value,
            }),
            headers: { 'Content-Type': 'application/json' },
        })

        if (newPost.ok) {
            document.location.replace('/dashboard');
            } else {
            alert('Failed to Post!');
            }
}

document.querySelector("#new-post-form").addEventListener('submit', createNewPost)