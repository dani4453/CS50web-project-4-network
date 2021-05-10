
document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        document.getElementById('allpost').addEventListener('click', post_render);
        //document.getElementById('following').addEventListener('click', following);
        document.getElementById("post").addEventListener('click', post_write);

        post_render();  
    }
  }

function post_render(){
    console.log("Post render")
    document.querySelector('#all-post').style.display = 'block';
    document.querySelector('#following1').style.display = 'none';

    document.querySelector('#posts').innerHTML = '';

    fetch('/post', {
        method: 'GET'})
    .then(response =>  response.json())
    .then(posts => {
        console.log(posts)
        posts.forEach(post => {
            console.log(post)
            id = post["id"];
            post_text = post["post"]

            var div = create_main_container(id)

            const post_div = append_text(post_text);
            div.append(post_div);

            document.querySelector('#posts').append(div);
        });
    });
}

function post_write(){
    console.log("Post write")
    let post = document.querySelector('#postTextArea').value;

    fetch('/post', {
        method: 'POST',
        body: JSON.stringify({
            post:post
        })
    })
    .then(response => response.json())
    .then(result => {});

    document.querySelector('#postTextArea').value = '';
    post_render();
}

function following(){
    document.querySelector('#all-post').style.display = 'none';
    document.querySelector('#following1').style.display = 'block';
    var div = create_main_container(id)

    const post_div = append_text("Following");
    div.append(post_div);

    document.querySelector('#all-post').append(div);
}

function create_main_container(id) {
    var container = document.createElement('div');
    container.style.width = 'auto';
    container.style.height = '50px';
    container.setAttribute("data-id", id);
    container.className = 'd-flex p-2 mb-1 border rounded-sm';
    return container;
  }

  function append_text(text) {
    const text_div = document.createElement('div');
    text_div.innerHTML = text;
    return text_div;
  }