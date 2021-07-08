import Modal from './modal.js'

const modal = Modal()

const modalTittle = document.querySelector('.modal h2')
const modalDiscription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')


//Pegar quando o marcar como lido for clicado
//Pegar todos os botoes que existe como a class check
const checkButtons = document.querySelectorAll(".actions a.check")

checkButtons.forEach(button => {
    //adicionar a escuta(addeventelistener)
    button.addEventListener("click", handleClick) 
})

//Pegar quando o for excluido
// Quando o botao delite for clicado ele abre a modal
const deleteButton = document.querySelectorAll(".actions a.delete")

deleteButton.forEach(button =>{
    button.addEventListener("click", (event) => handleClick(event, false))
})

function handleClick(event, check = true){
    event.preventDefault()
    const text = check ? "Marcar como lida" : "Excluir"
    const slug = check? "check": "delete"
    const roomId = document.querySelector("#room-id").dataset.id
    const questionId = event.target.dataset.id

    const form = document.querySelector(".modal form")
    form.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`)

    modalTittle.innerHTML =` ${text} esta Pergunta`
    modalDiscription.innerHTML =  `Tem certeza que deseja ${text.toLowerCase()} esta pergunta?`
    modalButton.innerHTML = check ? "Sim marcar como lida" : "Sim, excluir"
    check? modalButton.classList.remove("red") : modalButton.classList.add("red")

    //Abrir modal
    modal.open()
}

