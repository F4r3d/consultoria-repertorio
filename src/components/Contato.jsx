import React from "react";
import './Contato.css';

function Contato() {

    const nome = "";
    const email = '';
    const fone = '';
    const mensagem = '';


    return (

        <div className="contato">

            <h2>Contato</h2>

            <div className="formulario">

            <form className="form-contato" name="contato" method="POST" data-netlify="true">
            <input type="text" name="nome" placeholder="Nome" required />
            <input type="email" name="email" placeholder="e-mail" required />
            <input type="tel" id="telefone" name="telefone" placeholder="(XX) XXXXX-XXXX" required />
            <textarea name="mensagem" placeholder="Mensagem..." required></textarea>
            <button type="submit">E n v i a r</button>
            </form>
   

            </div>
        </div>
    )
}

export default Contato;