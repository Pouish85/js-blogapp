import './form.scss';

const form = document.querySelector("form");
const errorList = document.querySelector("#errors");
let errors = [];
// const cancelBtn = document.querySelector("btn-secondary");

// cancelBtn.addEventListener('click', () => {
//     location.assign('./index.html');
// })

const formIsValid = (data) => {
    if(!data.author || !data.category || !data.content || !data.title) {
        errors.push("Vous devez renseigner tous les champs!")
    }

    if(errors.length) {
        let errorHTML = '';
        errors.forEach(error => {
            errorHTML += `<li>${error}</li>`
        });
        errorList.innerHTML = errorHTML;
        return false;
    } else {
        errorList.innerHTML = "";
        return true;
    }
}

form.addEventListener('submit', async event => {
    event.preventDefault();

    const formData = new FormData(form);
    const entries = formData.entries();

    const data = Object.fromEntries(entries);

    if (formIsValid(data)) {
        try {
            const json = JSON.stringify(data);

            const response = await fetch("https://restapi.fr/api/dwwm_dq", {
                method: "POST", 
                headers: { 'Content-Type' : 'application/json'},
                body: json
            })
            if (response.status < 299) {
                location.assign('./index.html');

            }
            console.log(body);
        } catch (error) {
            console.log(error);            
        }

    }

})