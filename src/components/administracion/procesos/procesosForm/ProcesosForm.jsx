import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router";
import { ProcesosIndex } from "./ProcesosIndex";

export const ProcesosForm = () => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const { uuid } = useParams();
  const [proceso, setProceso] = useState("");
  //Estado del input del proceso
  const handleProceso = (e) => {
    setProceso(e.target.value);
  };
  //Hacer la peticion si viene el uuid
  useEffect(() => {
    if (uuid === undefined) {
      return;
    }
    let token = localStorage.getItem("token_bearer");
    axios
      .get(`${baseUrl}/parametrizacion/index/process/${uuid}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setProceso(response.data.Proceso.process);
      })
      .catch(function (response) {
        console.log(response);
      });
  }, [uuid, baseUrl]);
  //Guardar proceso
  const handleSaveProceso = (e) => {
    e.preventDefault();
    if (proceso.length < 1) {
      Swal.fire(
        "Upss...",
        "Por favor introduce un proceso para guardar",
        "error"
      );
      return;
    }
    let token = localStorage.getItem("token_bearer");
    axios
      .post(
        `${baseUrl}/parametrizacion/store/proceso`,
        {
          proceso,
        },
        {
          //En la peticion post se tuvo que enviar estos encabezados ya que no los queria recibir
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      )
      .then(function (response) {
        if (response.data.res === "exists_process") {
          Swal.fire("Ya existe", "El proceso ya existe", "error");
          return;
        }
        if (response.data.res === "new_process") {
          console.log(response);
          Swal.fire("Exito", "El proceso se ha creado exitosamente", "success");
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  };
  //Actualizar sub proceso
  const handleUpdateProceso = (e) => {
    e.preventDefault();
    if (proceso.length < 1) {
      Swal.fire(
        "Upss...",
        "Por favor introduce un proceso para guardar",
        "error"
      );
      return;
    }
    let token = localStorage.getItem("token_bearer");
    axios
      .put(
        `${baseUrl}/parametrizacion/update/proceso/${uuid}`,
        {
          proceso,
        },
        {
          //En la peticion post se tuvo que enviar estos encabezados ya que no los queria recibir
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      )
      .then(function (response) {
        console.log(response);
        if (response.data.res === "exists_process") {
          Swal.fire("Ya existe", "El proceso ya existe", "error");
          return;
        }
        if (response.data.res === "update_process") {
          Swal.fire(
            "Exito",
            "El proceso se ha actualizado exitosamente",
            "success"
          );
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  };
  return (
    <ProcesosIndex
      uuid={uuid}
      proceso={proceso}
      handleProceso={handleProceso}
      handleSaveProceso={handleSaveProceso}
      handleUpdateProceso={handleUpdateProceso}
    />
  );
};
