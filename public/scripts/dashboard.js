async function verify() {
    'use strict'
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })


}

function show() {
    const form = document.getElementById('allergyInput');
    const submit = document.getElementById('tutorial');
    form.setAttribute("required", "")
    // submit.style.visibility = 'visible';
    submit.style.display = 'block';
}

function hide() {
    const form = document.getElementById('allergyInput');
    const submit = document.getElementById('tutorial');
    form.removeAttribute("required", "");
    form.value = '';
    submit.style.display = 'none';
}

function validateSize(input) {
    const fileSize = input.files[0].size / 1024 / 1024; // in MiB
    console.log(input.files[0].name);

    if (fileSize > 2) {
        alert('File size exceeds 2 MiB, please try uploading something smaller!');
        input.value = null;
        console.log("successfully reset");
    } else {
        // alert("its fine");
    }
}