import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Your Supabase details
const supabaseUrl = 'https://your-project-id.supabase.co'
const supabaseKey = 'your-public-anon-key'
const supabase = createClient(supabaseUrl, supabaseKey)

// Very basic front-end password (you can make it stronger later)
const secretPassword = "EliteVacation2025"

// Initialize Quill editor
const quill = new Quill('#editor', {
  theme: 'snow',
  placeholder: 'Write your amazing blog post here...',
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['link', 'blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean']
    ]
  }
})    

document.getElementById('password-submit').addEventListener('click', () => {
  const inputPassword = document.getElementById('password-input').value
  if (inputPassword === secretPassword) {
    document.querySelector('.password-section').style.display = 'none'
    document.getElementById('create-post-section').style.display = 'block'
  } else {
    document.getElementById('password-error').innerText = 'Incorrect password. Try again.'
  }
})

document.getElementById('create-post-form').addEventListener('submit', async (e) => {
  e.preventDefault()

  const title = document.getElementById('title').value
  const slug = document.getElementById('slug').value
  const image_url = document.getElementById('image_url').value
  const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim())
  const content = quill.root.innerHTML
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([
      { title, slug, image_url, tags, content }
    ])

  if (error) {
    console.error('Error creating post:', error.message)
    document.getElementById('result').innerHTML = `<p style="color:red;">Failed to create post. Try again.</p>`
    return
  }

  document.getElementById('result').innerHTML = `
    <p style="color:green;">Post published successfully! 🎉</p>
    <p><a href="blog.html">View Blog</a></p>
  `
  
  document.getElementById('create-post-form').reset()
})