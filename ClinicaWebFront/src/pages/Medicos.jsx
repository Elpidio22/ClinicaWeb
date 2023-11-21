import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

export const Medicos = () => {
  const { sesion } = useAuthContext();
  const [medicos, setMedicos] = useState([]);
  const [nombreMedico, setNombreMedico] = useState("");
  const [apellidosMedico, setApellidosMedico] = useState("");
  const [especialidadMedico, setEspecialidadMedico] = useState("");
  const [ingreseMedico, setIngreseMedico] = useState("");

  useEffect(() => {
      cargarMedicos();
    }, []);

    const cargarMedicos = async () => { 
      try { 
        const response = await axios.get("http://localhost:3000/medicos",{ 
          headers: { Authorization: `Bearer ${sesion.token}` }, 
        }); 
        setMedicos(response.data); 
      } catch (error) { 
        console.error("Error al cargar medicos:", error); 
      } 
    }; 
  const agregarMedico = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/medicos",
        {
          med_nombre: nombreMedico,
          med_apellidos: apellidosMedico,
          id_especialidad: especialidadMedico,
        },
        {
          headers: { Authorization: `Bearer ${sesion.token}` },
        }
      );

      setMedicos([...medicos, response.data]);
      setNombreMedico("");
      setApellidosMedico("");
      setEspecialidadMedico("");
    
        
    } catch (error) {
      console.error("Error al agregar médico:", error);
    }
  };

  const eliminarMedico = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/medicos/${id}`, {
        headers: { Authorization: `Bearer ${sesion.token}` },
      });

      const updatedMedicos = medicos.filter((medico) => medico.id_medico !== id);
      setMedicos(updatedMedicos);
    } catch (error) {
      console.error("Error al eliminar medico:", error);
    }
  };

  const buscarMedico = async (medico) => {
    try {
      const response = await axios.get(`http://localhost:3000/medicos/${medico.id}`, {
        headers: { Authorization: `Bearer ${sesion.token}` },
      });

      // Si ingreseMedico está vacío, cargar todos los médicos nuevamente
      if (!ingreseMedico.trim()) {
        const allMedicos = await axios.get("http://localhost:3000/medicos", {
          headers: { Authorization: `Bearer ${sesion.token}` },
        });
        setMedicos(allMedicos.data);
      } else {
        setMedicos([response.data]);
      }
    } catch (error) {
      console.error("Error al buscar médico:", error);
    }
  };

  return (
    <>
      <h2>Médicos</h2>
      <div className="container">
        <label htmlFor="nombreMedico">Nombre del Médico:</label>
        <input
          type="text"
          id="nombreMedico"
          value={nombreMedico}
          onChange={(e) => setNombreMedico(e.target.value)}
        />

        <label htmlFor="apellidosMedico">Apellidos:</label>
        <input
          type="text"
          id="apellidosMedico"
          value={apellidosMedico}
          onChange={(e) => setApellidosMedico(e.target.value)}
        />

        <label htmlFor="especialidadMedico">Especialidad:</label>
        <input
          type="text"
          id="especialidadMedico"
          value={especialidadMedico}
          onChange={(e) => setEspecialidadMedico(e.target.value)}
        />

        <button type="button" class="btn btn-primary" onClick={agregarMedico}>Agregar</button>

        <br />
        <br />

        <label htmlFor="ingreseMedico">Ingrese Médico:</label>
        <input
          type="text"
          id="ingreseMedico"
          value={ingreseMedico}
          onChange={(e) => setIngreseMedico(e.target.value)}
        />
        <button type="button" class="btn btn-primary" onClick={() => buscarMedico({ id: ingreseMedico })}>Buscar</button>

        <br />

        <table className="table table-hover">
          <thead className="table-success">
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Especialidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {medicos.map((medico) => (
              <tr key={medico.id} onDoubleClick={() => buscarMedico(medico)}>
                <td>{medico.id_medico}</td>
                <td>{medico.med_nombre}</td>
                <td>{medico.med_apellidos}</td>
                <td>{medico.id_especialidad}</td>
                <td> 
                    <button 
                      className="btn btn-danger" 
                      onClick={() => eliminarMedico(medico.id_medico)} 
                    > 
                      Eliminar 
                    </button> 
                  </td> 
              </tr>

            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
