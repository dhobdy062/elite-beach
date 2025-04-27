import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Your Supabase details
const supabaseUrl = 'https://your-project-id.supabase.co'
const supabaseKey = 'your-public-anon-key'
const supabase = createClient(supabaseUrl, supabaseKey)

// Helper: Get URL slug
function getSlug() {
  const params = new URLSearchParams(window.location.search)
  return params.get('slug')
}

async function loadPost() {
  const slug = getSlug()
  if (!slug) {
    document.getElementById('blog-post').innerHTML = "<p>Invalid Post URL.</p>"
    return
  }

  let { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !post) {
    document.getElementById('blog-post').innerHTML = "<p>Post not found.</p>"
    return
  }

  document.getElementById('post-title').innerText = post.title
  document.getElementById('post-image').src = post.image_url
  document.getElementById('post-image').alt = post.title
  document.getElementById('post-content').innerText = post.content
  document.getElementById('post-tags').innerText = `Tags: ${post.tags.join(', ')}`
  document.getElementById('post-date').innerText = `Published on: ${new Date(post.created_at).toLocaleDateString()}`
}

loadPost()