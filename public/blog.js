//blog.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Your Supabase details
const supabaseUrl = 'https://your-project-id.supabase.co'
const supabaseKey = 'your-public-anon-key'
const supabase = createClient(supabaseUrl, supabaseKey)

async function loadPosts() {
  let { data: posts, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error loading posts:', error)
    return
  }

  const blogSection = document.getElementById('blog-posts')
  blogSection.innerHTML = posts.map(post => `
    <article class="blog-post">
      <a href="blog-post.html?slug=${post.slug}">
        <img src="${post.image_url}" alt="${post.title}" style="width:100%; height:200px; object-fit:cover; border-radius:8px;">
        <h3>${post.title}</h3>
        <p>${post.content.substring(0, 150)}...</p>
        <p><small>Tags: ${post.tags ? post.tags.join(', ') : ''}</small></p>
        <p><small>Posted on: ${new Date(post.created_at).toLocaleDateString()}</small></p>
      </a>
    </article>
  `).join('')
}

loadPosts()