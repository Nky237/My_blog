let postWrapper = document.getElementById('post-holder')
let postBox = []
let postForm = document.getElementById('post-form')
let title = document.getElementById('title')
let body = document.getElementById('body')



// CHANGING BACKGROUND COLOR
let colors = ['red', 'blue', 'yellow', 'red', 'black', 'purple', 'indigo', 'pink']

let button = document.getElementById('btnoo')

button.addEventListener('click', changeBg)

function changeBg(){
    var randomColors = colors[Math.floor(Math.random() * colors.length)]
    let bottom = document.querySelector('.game')
    bottom.style.background = randomColors
}

// GETTING OF POST

function getPost(){
  fetch('https://jsonplaceholder.typicode.com/posts')
.then((response) => response.json())
.then((data) => {
  // console.log(data)  
  postBox = data
  let postHolder = ''
  let boxy = postBox.slice(0,2)
 boxy.forEach(post => {
  //  console.log(post)
    postHolder += `
    <div data-aos="flip-left"data-aos-easing="ease-out-cubic" data-aos-duration="2000" class="col-lg-6 col-md-6 col-sm-12 mb-3">
    <div class="card h-100">
        <div class="card-body">
          <p>${post.id}</p>
            <p id="post-title">${post.title}</p>
            <p id="post-body"> ${post.body}</p>
        </div>
        
            <div class="d-flex justify-content-between">
                <button type="submit" class="btn btn-primary m-1" onclick="updatePost(${post.id})"><i class="fa fa-upload" style="font-size:22px; padding-left: 3px;"></i> Update Post</button>
                <button type="submit" class="btn btn-primary m-1" onclick="viewPost(${post.id})"><i class="fa fa-eye" style="font-size:22px; padding-left: 3px;"></i> View Post</button>
                <button type="submit" class="btn btn-danger m-1" onclick="deletePost(${post.id})"><i class="fa fa-trash" style="font-size:22px; padding-left: 3px;"></i> Delete Post</button>
            </div>

            
       </div>
    </div>
</div>
  
    `
    
});
    postWrapper.innerHTML = postHolder
  
});
}
getPost()

postForm.addEventListener('click', createPost)

function createPost(e){
  e.preventDefault()

  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: title.value,
      body:  body.value,
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      let postHolder = ''
  let boxy = postBox.slice(0,2)
  boxy.push(data)
 boxy.forEach(post => {
    postHolder += `
    <div data-aos="flip-left"data-aos-easing="ease-out-cubic" data-aos-duration="2000" class="col-lg-6 col-md-6 col-sm-12 mb-3">
    <div class="card h-100">
        <div class="card-body">
          <p>${post.id}</p>
            <p id="post-title">${post.title}</p>
            <p id="post-body"> ${post.body}</p>
        </div>
        
            <div class="d-flex justify-content-between">
                <button type="submit" class="btn btn-primary m-1" onclick="updatePost(${post.id})"><i class="fa fa-upload" style="font-size:22px; padding-left: 3px;"></i> Update Post</button>
                <button type="submit" class="btn btn-primary m-1" onclick="viewPost(${post.id})"><i class="fa fa-eye" style="font-size:22px; padding-left: 3px;"></i> View Post</button>
                <button type="submit" class="btn btn-danger m-1" onclick="deletePost(${post.id})"><i class="fa fa-trash" style="font-size:22px; padding-left: 3px;"></i> Delete Post</button>
            </div>

            
       </div>
    </div>
</div>
  
    `
    
});
    postWrapper.innerHTML = postHolder

    })
}



function updatePost(id){
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
  method: 'PUT',
  body: JSON.stringify({
    id: id,
    title: title.value,
    body: body.value,
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    let postTitles = document.querySelectorAll('#post-title')
    let postBodies = document.querySelectorAll('#post-body')
    postTitles.forEach((postTitle, index) => {
        if (index+1 === id){
          if(data.title !== ''){
            postTitle.innerHTML = data.title
          }
        }

    })
    postBodies.forEach((postBody, index) => {
        if (index+1 === id){
          if(data.body !== ''){         
             postBody.innerHTML = data.body
            }

        }

    })
  });
}



function viewPost(id){
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
   localStorage.setItem('viewedPost', JSON.stringify(data))
    window.location.href = 'get.html'
  });
}



function deletePost(id){
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
  method: 'DELETE',
})

.then((response) => response.json())
.then((data) => {
console.log(data)
postBox = postBox.filter(post => post.id !==id)
console.log(postBox)
let postHolder = ''
      // postBox.push(data)
      boxy = postBox.slice(0,2)
      boxy.forEach(post => {
        //  console.log(post)
          postHolder += `
          <div data-aos="flip-left"data-aos-easing="ease-out-cubic" data-aos-duration="2000" class="col-lg-6 col-md-6 col-sm-12 mb-3">
          <div class="card h-100">
              <div class="card-body">
                <p>${post.id}</p>
                  <p id="post-title">${post.title}</p>
                  <p id="post-body"> ${post.body}</p>
              </div>
              
                  <div class="d-flex justify-content-between">
                      <button type="submit" class="btn btn-primary m-1" onclick="updatePost(${post.id})"><i class="fa fa-upload" style="font-size:22px; padding-left: 3px;"></i> Update Post</button>
                      <button type="submit" class="btn btn-primary m-1" onclick="viewPost(${post.id})"><i class="fa fa-eye" style="font-size:22px; padding-left: 3px;"></i> View Post</button>
                      <button type="submit" class="btn btn-danger m-1" onclick="deletePost(${post.id})"><i class="fa fa-trash" style="font-size:22px; padding-left: 3px;"></i> Delete Post</button>
                  </div>
      
                  
             </div>
          </div>
      </div>
        
          `
          
      });
        
   
         postWrapper.innerHTML = postHolder
});
}

