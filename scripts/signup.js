
const notif = document.querySelector('#notification');
// Sign user up
const setupOnChange = () => {
    ['#username', '#email', '#password', '#repeat_password'].forEach(val => {
        document.querySelector(val).addEventListener('change', () => {
            notif.style.display = 'none';
        })
    });
}


document.querySelector('#signup-form-id').addEventListener('submit', e => {
    e.preventDefault();
    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const password_chk = document.querySelector('#repeat_password').value;
    const role = 'User';

    const changeNotification = (msg, background) => {
        if (notif.style.animation) notif.style.animation = '';
        notif.style.animation = 'notificationEffect 0.5s ease-in forwards';
        notif.style.display = 'block';
        notif.innerHTML = msg;
        notif.style.background = background || 'rgba(255, 0, 0, 0.5)';
    }

    if (username && email && password && password_chk) {
        if (password === password_chk) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    document.querySelector('#signup-form-id').reset();
                    setTimeout(() => {
                        changeNotification('registration successful', 'rgb(62, 184, 62)');
                    }, 2000)
                })
                .catch(error => {
                    changeNotification(error.message);
                    setupOnChange();
                });
        } else {
            let msg;
            if (!(username.length > 5)) {
                msg = 'Passwords do not match and username should be more than 5 characters';
            }
            notif.innerHTML = 'Passwords do not match' || msg;
            notif.style.animation = 'notificationEffect 0.5s ease-in forwards';
            notif.style.display = 'block';
            notif.style.background = 'rgba(255, 0, 0, 0.5)';
            setupOnChange();
        }
    } else alert('Please, fill in all the fields');
});