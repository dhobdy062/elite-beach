import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Your Supabase details
const supabaseUrl = 'https://your-project-id.supabase.co'
const supabaseKey = 'your-public-anon-key'
const supabase = createClient(supabaseUrl, supabaseKey)

async function loadDashboard() {
  let { data: posts, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error loading dashboard posts:', error)
    return
  }

  const postsList = document.getElementById('posts-list')
  postsList.innerHTML = posts.map(post => `
    <div class="blog-post">
      <h3>${post.title}</h3>
      <p><small>Slug: ${post.slug}</small></p>
      <button onclick="deletePost('${post.id}')" class="btn-primary" style="margin-top:10px;">Delete Post</button>
    </div>
  `).join('')
}
window.editPost = async (id) => {
    const newTitle = prompt('Enter new title:')
    const newContent = prompt('Enter new content (simple text only for now):')
  
    if (!newTitle || !newContent) {
      alert('Both title and content are required.')
      return
    }
  
    const { error } = await supabase
      .from('blog_posts')
      .update({ title: newTitle, content: newContent })
      .eq('id', id)
  
    if (error) {
      console.error('Error editing post:', error)
      alert('Failed to edit post.')
    } else {
      alert('Post updated successfully!')
      loadDashboard()
    }
  }
window.deletePost = async (id) => {
  if (confirm('Are you sure you want to delete this post?')) {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting post:', error)
      alert('Failed to delete post. Try again.')
    } else {
      alert('Post deleted successfully!')
      loadDashboard() // Refresh list
    }
  }yes
}

loadDashboard()