import React from "react";
import './Equipe.css';

function Equipe() {

    const colaborador1 = '/galeria/laine.jpg';
    const colaborador2 = '/galeria/rosana.png';
    const colaborador3 = '/galeria/annabiia.jpeg';
    const colaborador4 = '/galeria/edson.png';


    return (

        <div className="equipe">

            <h2>Equipe</h2>

            <div className="colaboradores">

                <div className="colaboradores-item">
                    <img
                    src={colaborador1}
                    alt="Foto de Laine"
                    className="foto-circular"
                    />
                    <p>Laine Romero</p>
                    <small>Comercial</small>
                </div>
                <div className="colaboradores-item">
                    <img
                    src={colaborador2}
                    alt="Foto de Rosana"
                    className="foto-circular"
                    />
                    <p>Rosana Romero</p>
                    <small>Comunicação</small>
                </div>
                <div className="colaboradores-item">
                    <img
                    src={colaborador3}
                    alt="Foto de Anna Bia"
                    className="foto-circular"
                    />
                    <p>Anna Bia Viana</p>
                    <small>Social Media</small>
                </div>
                <div className="colaboradores-item">
                    <img
                    src={colaborador4}
                    alt="Foto de Edson"
                    className="foto-circular"
                    />
                    <p>Edson Faria</p>
                    <small>Administrativo</small>
                </div>
            </div>
        </div>
    )
}

export default Equipe;