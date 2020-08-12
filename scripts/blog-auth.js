document.querySelector('#admin-link').style.display = 'none';

database
    .collection('posts')
    .get()
    .then(result => {
        result.forEach(doc => {
            const postsWrapper = document.querySelector('.posts-wrapper');
            const div = document.createElement('div');
            const date = doc.data().date_posted;
            div.innerHTML = `
                <h2>${doc.data().title}</h2>
                <span>Posted on ${date.toString().split('T')[0]} at ${date.toString().split('T')[1]} by Maxime I.</span>
                <p>${doc.data().paragraphs.toString().split(' ').splice(0, 10).join(' ')}...</p>
                <a href="./posts/${doc.data().filename}">Read more</a>
            `;
            div.classList.add('post');
            postsWrapper.appendChild(div);
        });
    })



 
async function blogAuth() {
    firebase.auth().onAuthStateChanged(() => {
        if (globalUser){
            const signupLink = document.querySelector('#auth-logout a');
            const linksContainer = document.querySelector('.links-container');
            document.querySelector('.links-container').style.display = 'none';
            document.querySelector('#auth-logout a').style.display = 'none';
            document.querySelector('#auth-logout').innerHTML = '<button><i class="fa fa-sign-out"></i>&nbsp;Logout</button>';
            document.querySelector('#auth-logout button').addEventListener('click', () => {
                firebase.auth().signOut();
                location.reload();

            });
            const prom = new Promise((resolve, reject) => {
                if (globalUser.email === 'mxmishimwe5@gmail.com') {
                    resolve('admin');
                } else {
                    reject('not admin');
                }
            })
            prom.then(() => {
                document.querySelector('#admin-link').style.display = 'block';
            }).catch(() => {
                console.log('welcome user');
            });
        } else {
            console.log('user not signed in');
        }
    });
}

blogAuth();
