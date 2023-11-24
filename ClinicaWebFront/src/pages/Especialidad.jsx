import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

export const Especialidad = () => {
  const { sesion } = useAuthContext();
  const [especialidades, setEspecialidades] = useState([]);
  const [nombreEspecialidad, setNombreEspecialidad] = useState("");
  const [ingreseEspecialidad, setIngreseEspecialidad] = useState("");


  useEffect(() => {
   cargarEspecialidades(); 
  },[]);

  const cargarEspecialidades = async () => {
    try {
      const response = await axios.get("http://localhost:3000/especialidad");
      setEspecialidades(response.data);
    } catch (error) {
      console.error("Error al cargar especialidades:", error);
    }
  };

  const agregarEspecialidad = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/especialidad",
        {
          nombre: nombreEspecialidad,
        },
        {
          headers: { Authorization: `Bearer ${sesion.token}` },
        }
      );

      setEspecialidades([...especialidades, response.data]);
      setNombreEspecialidad("");
      cargarEspecialidades();
    } catch (error) {
      console.error("Error al agregar especialidad:", error);
    }
  };

  const buscarEspecialidad = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/especialidad/${ingreseEspecialidad}`, {
        headers: { Authorization: `Bearer ${sesion.token}` },
      });

      // Si ingreseEspecialidad está vacío, cargar todas las especialidades nuevamente
      if (!ingreseEspecialidad.trim()) {
        const allEspecialidades = await axios.get("http://localhost:3000/especialidad", {
          headers: { Authorization: `Bearer ${sesion.token}` },
        });
        setEspecialidades(allEspecialidades.data.data);
      } else {
        setEspecialidades([response.data]);
      }
    } catch (error) {
      console.error("Error al buscar especialidad:", error);
    }
  };

  const eliminarEspecialidad = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/especialidad/${id}`, {
        headers: { Authorization: `Bearer ${sesion.token}` },
      });

      const updatedEspecialidad = especialidades.filter((especialidad) => especialidad.id_especialidad !== id);
      setEspecialidades(updatedEspecialidad);
    } catch (error) {
      console.error("Error al eliminar especilialidad:", error);
    }
  };

  return (
    <>
      <h2>Especialidades</h2>
      <div className="container">
        <label htmlFor="nombreEspecialidad">Nombre de la Especialidad:</label>
        <input
          type="text"
          id="nombreEspecialidad"
          value={nombreEspecialidad}
          onChange={(e) => setNombreEspecialidad(e.target.value)}
        />

        <button type="button" class="btn btn-primary" onClick={agregarEspecialidad}>Agregar</button>

        <br />
        <br />

        <label htmlFor="ingreseEspecialidad">Ingrese Especialidad:</label>
        <input
          type="text"
          id="ingreseEspecialidad"
          value={ingreseEspecialidad}
          onChange={(e) => setIngreseEspecialidad(e.target.value)}
        />
        <button type="button" class="btn btn-primary" onClick={buscarEspecialidad}>Buscar</button>

        <br />

        <table className="table table-hover">
          <thead className="table-success">
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {especialidades.map((especialidad,id_especialidad) => (
              <tr key={id_especialidad.id_especialidad} onClick={() => buscarEspecialidad(especialidad)}>
                <td>{especialidad.id_especialidad}</td>
                <td>{especialidad.nombre}</td>
                <td> 
                    <button 
                      className="btn btn-danger" 
                      onClick={() => eliminarEspecialidad(especialidad.id_especialidad)} 
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
