import React from "react";
import MaterialTable from "material-table";
import { useHistory } from "react-router";
export const RolesScreen = () => {
  const history = useHistory();
  const columns = [
    {
      title: "Roles",
      field: "role",
    },
    {
      title: "Descripcion del roles",
      field: "description",
    },
  ];
  const data = [
    { role: "administrador", description: "Administrador" },
    { role: "administrador", description: "Administrador" },
    { role: "administrador", description: "Administrador" },
    { role: "administrador", description: "Administrador" },
  ];
  const CreateRole = () => {
    history.push("/roles/create");
  };
  return (
    <div>
      <div onClick={CreateRole}>Crear role</div>
      <MaterialTable
        columns={columns}
        data={data}
        title={"Roles"}
        actions={[
          {
            icon: "edit",
            tooltip: "Editar rol",
            onClick: (event, rowData) => alert("Editar"),
          },
          {
            icon: "delete",
            tooltip: "Eliminar rol",
            onClick: (event, rowData) => alert("eliminar"),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
        localization={{
          header: {
            actions: "Acciones",
          },
        }}
      />
      {/* <div onClick={}>Crear nuevo role</div> */}
    </div>
  );
};
