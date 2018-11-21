const deletePost = async (event, id) => {
  event.stopPropagation(); // Stop the opening of the link
  console.log(`Deleting ID: ${id}`);

  try {
    const res = await fetch(`/posts/${id}`, { method: 'DELETE', credentials: 'same-origin' });
    console.log(res.status);
    if (res.status === 200) {
      const deleted = document.getElementById(id);
      deleted.remove();
    } else {
      alert('Hmm, there was a problem deleting this post.');
    }
  } catch (error) {
    console.log('error', error);
  }
};
