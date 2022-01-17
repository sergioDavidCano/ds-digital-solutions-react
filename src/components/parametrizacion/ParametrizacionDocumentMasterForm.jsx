import React, { useState, useEffect } from "react";
import { Navbar } from "../navbar/Navbar";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardBackspace, AddBox, RemoveCircle } from "@material-ui/icons";
import { useForm } from "../../hooks/useForm";
import { DocumentMasterPaginateInit } from "../../redux/actions/formDocumentTableActions";
import { ParametrizacionDocumentMasterFormPreviow } from "./ParametrizacionDocumentMasterFormPreviow";
import {
  ViewDocumentMaster,
  NewDocumetMaster,
  UpdateDocumentMaster,
} from "../../redux/actions/formDocumentMasterAction";
import { ParametrizacionDocumentMasterCard } from "./ParametrizacionDocumentMasterCard";
// import { InputText } from "../mainInput/InputText";
import { InputLink } from "../mainInput/InputLink";
import { BtnFloat } from "../bellboy float/btn-float";
import { InputSelect } from "../mainInput/InputSelect";
import {
  listArray,
  titleColumns,
  indexTypeCelda,
  typeCelda,
} from "../../helpers/typeCelda";
export const ParametrizacionDocumentMasterForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { uuid } = useParams();
  //Hacer el dispach si viene un uuid en la url para consultar
  useEffect(() => {
    dispatch(ViewDocumentMaster(uuid));
  }, [dispatch, uuid]);
  //Tomar del redux el estado del documento que estamos modificando
  let documentMaster = useSelector(
    (state) => state.documentMaster.documentMaster
  );
  if (documentMaster.res === "success_update") {
    dispatch(DocumentMasterPaginateInit());
    history.push("/documentation-master-list");
  }
  //Manejo de que tipo es cada celda
  const [tableColumnsTypeValue, handletableColumnsTypeValueChange] =
    useForm(typeCelda);
  //Inicial state nuevo documento
  const celdass = Object.values(tableColumnsTypeValue);
  //Inicial state del formulario cuando se va a crear nuevo
  const inicialStateOption = [
    [
      {
        card: 0,
        optionValue: "undefined",
        titleCard: "",
        text: "",
        linkDescription: "",
        link: "",
        descripcionArchivo: "",
        archivo: "",
        heigth: { state: true },
        img: "",
        tabla: { column: [], row: [] },
        tablaTypeCelda: {
          title_columna: [],
          celda: [],
          type: [],
          lista: [],
          celdaType: [],
        },
      },
    ],
    [
      {
        card: 1,
        optionValue: "Texto",
        titleCard: "",
        text: "",
        linkDescription: "",
        link: "",
        img: "",
        descripcionArchivo: "",
        archivo: "",
        heigth: { state: true },
        tabla: { column: [1], row: [1] },
        tablaTypeCelda: {
          title_columna: titleColumns,
          celda: ["0", ...celdass],
          type: indexTypeCelda,
          lista: listArray,
          celdaType: JSON.stringify(["0", ...celdass]),
        },
      },
    ],
  ];
  //Inicial estate de los estados de la tarjetas de los datos basicos
  const initialStateDataBasic = [
    [
      {
        id: 1,
        type: "Texto",
        title: "Proceso",
        description: "",
      },
    ],
  ];
  //Use state de la cabeza del formulario
  const [codigo, setCodigo] = useState("");
  const [formato, setFormato] = useState("");
  const [template, setTemplate] = useState("");
  const [description, setDescription] = useState("");
  //Manejo de que tipo de informacion quiere insertar el usuario en las tarjetas
  const [option, setOption] = useState(inicialStateOption);
  //Manejo de las tarjetas
  const [arrayCard, setArrayCard] = useState([1]);
  //Control de la ultima tarjeta que se creo
  const [ultime, setUltime] = useState(1);
  //Uso del tipo de datos lista
  const [lista, setLista] = useState([1]);
  //Mantener el estate de la ultima lista
  const [listaUltime, setListaUltime] = useState(1);
  //Ver vista previas
  const [preview, setPreview] = useState(false);
  //Manejo de las datas de cada tarjetas
  const [dataBasic, setDataBasic] = useState(initialStateDataBasic);
  //Manejo del id de cada tarjeta del proceso
  const [dataBasicCount, setDataBasicCount] = useState([]);
  //Manejo de la ultima tarjeta que se hizo
  const [dataBasicUlti, setDataBasicUlti] = useState(1);
  //Validaciones para traer la informacion e insertarla en los inputs del formulario
  //Mantener el estado del codigo
  const handleInputCode = (e) => {
    setCodigo(e.target.value);
  };
  //Mantener el estado del formato
  const handleInputFormat = (e) => {
    setFormato(e.target.value);
  };
  //Mantener el estado de la plantilla
  const handleInputTemplate = (e) => {
    setTemplate(e.target.value);
  };
  //Mantener el estado de la descripcion
  const handleInputDescription = (e) => {
    setDescription(e.target.value);
  };
  //Pagina anterior
  const handleBack = () => {
    dispatch(DocumentMasterPaginateInit());
    history.push("/documentation-master-list");
  };
  //Vista previa del documento
  const handlePreview = () => {
    setPreview(!preview);
  };
  //Agregar dato basico
  const handleAddDataBasic = () => {
    if (dataBasicCount.length <= 2) {
      let procesos = [...dataBasic];
      setDataBasic([
        ...procesos,
        [
          {
            id: dataBasicUlti + 1,
            type: "Texto",
            title: "",
            description: "",
          },
        ],
      ]);
      let newArrayCard = [...dataBasicCount, dataBasicUlti + 1];
      setDataBasicCount(newArrayCard);
      setDataBasicUlti(dataBasicUlti + 1);
    }
  };

  //vigilar que tipo de select es en datos basicos
  const handleTypeSelect = (e, id) => {
    let opcionData = [...dataBasic];
    opcionData[id - 1][0].type = e.target.value;
    setDataBasic(opcionData);
  };
  //Ttulo de datos basicos
  const handleTitle = (e, id) => {
    let opcionData = [...dataBasic];
    opcionData[id - 1][0].title = e.target.value;
    setDataBasic(opcionData);
  };
  //Descripcion de datos basicos
  const handleDescripcion = (e, id) => {
    let opcionData = [...dataBasic];
    opcionData[id - 1][0].description = e.target.value;
    setDataBasic(opcionData);
  };
  //Eliminar una tarjeta de datos basicos
  const handleRemove = (id) => {
    let opcionData = [...dataBasic];
    let item = dataBasicCount.indexOf(id);
    opcionData.splice(id - 1, 1, [
      {
        id: id,
        type: "undefined",
        title: "undefined",
        description: "undefined",
      },
    ]);
    dataBasicCount.splice(item, 1);
    setDataBasicCount([...dataBasicCount]);
    setDataBasic([...opcionData]);
  };
  //Funcion que llama al dispach para crear un nuevo formulario
  const handleDocument = (e) => {
    e.preventDefault();
    let arrayData = [];
    dataBasicCount.forEach(function (data, index) {
      arrayData.push(data);
    });
    const code = codigo;
    const format = formato;
    const position = arrayCard;
    const process_type = dataBasic[0][0].type;
    const process_description = dataBasic[0][0].description;
    const data_basic_type1 =
      dataBasic[arrayData[0] - 1] === undefined
        ? null
        : dataBasic[arrayData[0] - 1][0].type;
    const data_basic_title1 =
      dataBasic[arrayData[0] - 1] === undefined
        ? null
        : dataBasic[arrayData[0] - 1][0].title;
    const data_basic_description1 =
      dataBasic[arrayData[0] - 1] === undefined
        ? null
        : dataBasic[arrayData[0] - 1][0].description;
    const data_basic_type2 =
      dataBasic[[arrayData[1] - 1]] === undefined
        ? null
        : dataBasic[arrayData[1] - 1][0].type;
    const data_basic_title2 =
      dataBasic[[arrayData[1] - 1]] === undefined
        ? null
        : dataBasic[arrayData[1] - 1][0].title;
    const data_basic_description2 =
      dataBasic[[arrayData[1] - 1]] === undefined
        ? null
        : dataBasic[arrayData[1] - 1][0].description;
    const data_basic_type3 =
      dataBasic[[arrayData[2] - 1]] === undefined
        ? null
        : dataBasic[arrayData[2] - 1][0].type;
    const data_basic_title3 =
      dataBasic[[arrayData[2] - 1]] === undefined
        ? null
        : dataBasic[arrayData[2] - 1][0].title;
    const data_basic_description3 =
      dataBasic[[arrayData[2] - 1]] === undefined
        ? null
        : dataBasic[arrayData[2] - 1][0].description;
    const optionTarget = [...option];
    dispatch(
      NewDocumetMaster(
        code,
        format,
        template,
        description,
        position,
        process_type,
        process_description,
        data_basic_type1,
        data_basic_title1,
        data_basic_description1,
        data_basic_type2,
        data_basic_title2,
        data_basic_description2,
        data_basic_type3,
        data_basic_title3,
        data_basic_description3,
        optionTarget
      )
    );
  };
  //Esta funcion al dispacth que actualiza un formulario
  const handleDocumentUpdate = (e) => {
    e.preventDefault();
    let arrayData = [];
    dataBasicCount.forEach(function (data, index) {
      arrayData.push(data);
    });
    const code = codigo;
    const format = formato;
    const position = arrayCard;
    const process_type = dataBasic[0][0].type;
    const process_description = dataBasic[0][0].description;
    const data_basic_type1 =
      dataBasic[arrayData[0] - 1] === undefined
        ? null
        : dataBasic[arrayData[0] - 1][0].type;
    const data_basic_title1 =
      dataBasic[arrayData[0] - 1] === undefined
        ? null
        : dataBasic[arrayData[0] - 1][0].title;
    const data_basic_description1 =
      dataBasic[arrayData[0] - 1] === undefined
        ? null
        : dataBasic[arrayData[0] - 1][0].description;
    const data_basic_type2 =
      dataBasic[[arrayData[1] - 1]] === undefined
        ? null
        : dataBasic[arrayData[1] - 1][0].type;
    const data_basic_title2 =
      dataBasic[[arrayData[1] - 1]] === undefined
        ? null
        : dataBasic[arrayData[1] - 1][0].title;
    const data_basic_description2 =
      dataBasic[[arrayData[1] - 1]] === undefined
        ? null
        : dataBasic[arrayData[1] - 1][0].description;
    const data_basic_type3 =
      dataBasic[[arrayData[2] - 1]] === undefined
        ? null
        : dataBasic[arrayData[2] - 1][0].type;
    const data_basic_title3 =
      dataBasic[[arrayData[2] - 1]] === undefined
        ? null
        : dataBasic[arrayData[2] - 1][0].title;
    const data_basic_description3 =
      dataBasic[[arrayData[2] - 1]] === undefined
        ? null
        : dataBasic[arrayData[2] - 1][0].description;
    const optionTarget = [...option];
    dispatch(
      UpdateDocumentMaster(
        uuid,
        code,
        format,
        template,
        description,
        position,
        process_type,
        process_description,
        data_basic_type1,
        data_basic_title1,
        data_basic_description1,
        data_basic_type2,
        data_basic_title2,
        data_basic_description2,
        data_basic_type3,
        data_basic_title3,
        data_basic_description3,
        optionTarget
      )
    );
  };
  //Renderizado de los datos basicos de la aplicacion
  useEffect(() => {
    let arrayNumber = [];
    let array = [
      [
        {
          id: 1,
          type:
            documentMaster.DocumentMasterHead.process_type.trim().length === 0
              ? "Texto"
              : documentMaster.DocumentMasterHead.process_type,
          title: "Proceso",
          description: documentMaster.DocumentMasterHead.process_description,
        },
      ],
    ];
    if (documentMaster.DocumentMasterHead.data_basic_title1) {
      array.push([
        {
          id: 2,
          type: documentMaster.DocumentMasterHead.data_basic_type1,
          title: documentMaster.DocumentMasterHead.data_basic_title1,
          description:
            documentMaster.DocumentMasterHead.data_basic_description1,
        },
      ]);
      arrayNumber.push(2);
    }
    if (documentMaster.DocumentMasterHead.data_basic_title2) {
      array.push([
        {
          id: 3,
          type: documentMaster.DocumentMasterHead.data_basic_type2,
          title: documentMaster.DocumentMasterHead.data_basic_title2,
          description:
            documentMaster.DocumentMasterHead.data_basic_description2,
        },
      ]);
      arrayNumber.push(3);
    }
    if (documentMaster.DocumentMasterHead.data_basic_title3) {
      array.push([
        {
          id: 4,
          type: documentMaster.DocumentMasterHead.data_basic_type3,
          title: documentMaster.DocumentMasterHead.data_basic_title3,
          description:
            documentMaster.DocumentMasterHead.data_basic_description3,
        },
      ]);
      arrayNumber.push(4);
    }
    setDataBasicCount(arrayNumber);
    setDataBasic([...array]);
    setDataBasicUlti(arrayNumber.length + 1);
  }, [
    documentMaster.DocumentMasterHead.process_type,
    documentMaster.DocumentMasterHead.process_description,
    documentMaster.DocumentMasterHead.data_basic_title1,
    documentMaster.DocumentMasterHead.data_basic_type1,
    documentMaster.DocumentMasterHead.data_basic_description1,
    documentMaster.DocumentMasterHead.data_basic_type2,
    documentMaster.DocumentMasterHead.data_basic_title2,
    documentMaster.DocumentMasterHead.data_basic_description2,
    documentMaster.DocumentMasterHead.data_basic_type3,
    documentMaster.DocumentMasterHead.data_basic_title3,
    documentMaster.DocumentMasterHead.data_basic_description3,
  ]);
  //Renderizar los datos de la tarjeta de la aplicacion
  useEffect(() => {
    let arrayOptioValue = [
      [
        {
          titleCard: "",
          optionValue: "undefined",
          text: "",
          tabla: { column: [], row: [] },
          tablaTypeCelda: {
            title_columna: [],
            celda: [],
            type: [],
            lista: [],
            celdaType: [],
          },
          linkTitle: "",
          link: "",
          heigth: { state: true },
          img: "",
          card: 0,
        },
      ],
    ];
    if (documentMaster.res === "success_view") {
      //Renderiazado de los datos de la cabeza del formulario
      setCodigo(documentMaster.DocumentMasterHead.code);
      setFormato(documentMaster.DocumentMasterHead.format);
      setTemplate(documentMaster.DocumentMasterHead.template);
      setDescription(documentMaster.DocumentMasterHead.description);
      documentMaster.DocumentMasterBody.map(function (DocumentMasterBody) {
        return arrayOptioValue.push([
          {
            card: DocumentMasterBody.number_card,
            link:
              DocumentMasterBody.link === null ? "" : DocumentMasterBody.link,
            linkDescription:
              DocumentMasterBody.link_description === null
                ? ""
                : DocumentMasterBody.link_description,
            archivo:
              DocumentMasterBody.file === null ? "" : DocumentMasterBody.file,
            descripcionArchivo:
              DocumentMasterBody.file_description === null
                ? ""
                : DocumentMasterBody.file_description,
            img:
              DocumentMasterBody.image === null ? "" : DocumentMasterBody.image,
            heigth: { state: true },
            titleCard: DocumentMasterBody.title_card,
            optionValue: DocumentMasterBody.select_value,
            text:
              DocumentMasterBody.text_description === null
                ? ""
                : DocumentMasterBody.text_description,
            tabla: {
              column:
                JSON.parse(DocumentMasterBody.columns) === null
                  ? [1]
                  : JSON.parse(DocumentMasterBody.columns),
              row:
                JSON.parse(DocumentMasterBody.row) === null
                  ? [1]
                  : JSON.parse(DocumentMasterBody.row),
            },
            tablaTypeCelda: {
              title_columna:
                DocumentMasterBody.title_columns !== null
                  ? JSON.parse(DocumentMasterBody.title_columns)
                  : titleColumns,
              celda:
                DocumentMasterBody.type_celda !== null
                  ? JSON.parse(DocumentMasterBody.type_celda)
                  : ["0", ...celdass],
              type:
                DocumentMasterBody.identity_data_position !== null
                  ? JSON.parse(DocumentMasterBody.identity_data_position)
                  : indexTypeCelda,
              lista:
                DocumentMasterBody.list_value_celda !== null
                  ? JSON.parse(DocumentMasterBody.list_value_celda)
                  : null,
              celdaType:
                DocumentMasterBody.type_celda !== null
                  ? DocumentMasterBody.type_celda
                  : JSON.stringify(["0", ...celdass]),
            },
          },
        ]);
      });
      setOption(arrayOptioValue);
      let newArray = JSON.parse(documentMaster.DocumentMasterHead.position);
      setArrayCard(newArray);
      setUltime(newArray.length);
    }
    //Ognorando dependencias para que solo se llame una vez
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    documentMaster.DocumentMasterHead.code,
    documentMaster.DocumentMasterHead.format,
    documentMaster.DocumentMasterHead.template,
    documentMaster.DocumentMasterHead.description,
    documentMaster.DocumentMasterHead.position,
    documentMaster.DocumentMasterBody,
    documentMaster.res,
  ]);
  return (
    <div>
      <Navbar />
      {/* pasar propiedades para visualizacion del formulario  */}
      <ParametrizacionDocumentMasterFormPreviow
        lista={lista}
        codigo={codigo}
        option={option}
        ultime={ultime}
        preview={preview}
        formato={formato}
        setLista={setLista}
        setOption={setOption}
        arrayCard={arrayCard}
        setUltime={setUltime}
        dataBasic={dataBasic}
        listaUltime={listaUltime}
        setArrayCard={setArrayCard}
        dataBasicCount={dataBasicCount}
        setListaUltime={setListaUltime}
      />
      <div className="newDocument">
        <div className="containerNewDocument">
          <h2 className="title">
            <KeyboardBackspace className="icon" onClick={handleBack} />
            {documentMaster.res === "success_view"
              ? "Editar documento"
              : "Nuevo documento"}
          </h2>
          <div className="container-sub-title">
            <h6 className="sub-title">
              {documentMaster.res === "success_view"
                ? "Editar informacion del documento"
                : "Informacion del nuevo documento"}
            </h6>
          </div>
          <div className="linea"></div>
          <form
            className="formNewDocument"
            onSubmit={
              documentMaster.res === "success_view"
                ? handleDocumentUpdate
                : handleDocument
            }
            encType="multipart/formdata"
          >
            <div className="input-group-container">
              <div className="input-container">
                <input
                  name="codigo"
                  placeholder={"Codigo *"}
                  onChange={handleInputCode}
                  defaultValue={documentMaster.DocumentMasterHead.code}
                ></input>
              </div>
              <div className="input-container">
                <input
                  name="formato"
                  placeholder={"Formato *"}
                  onChange={handleInputFormat}
                  defaultValue={documentMaster.DocumentMasterHead.format}
                ></input>
              </div>
              <div className="input-container">
                <input
                  name={"template"}
                  placeholder="Plantilla *"
                  onChange={handleInputTemplate}
                  defaultValue={documentMaster.DocumentMasterHead.template}
                ></input>
              </div>
              <div className="input-container">
                <input
                  name={"description"}
                  placeholder="Descripcion *"
                  onChange={handleInputDescription}
                  defaultValue={documentMaster.DocumentMasterHead.description}
                ></input>
              </div>
            </div>
            <div className="container-type-document">
              <h6>Datos basicos</h6>
            </div>
            <div className="linea-2"></div>
            <div className="container_icons">
              <span>Agregar(max 4)</span>
              <AddBox className="add" onClick={handleAddDataBasic} />
            </div>
            <div className="input-group-container-2">
              <div className="container_data_basic">
                <div className="container_sub_data_basic">
                  <div className="header">
                    <div className="container_select">
                      <InputSelect
                        id={1}
                        className={"select_columns"}
                        onclick={handleTypeSelect}
                        selected={
                          documentMaster.DocumentMasterHead.process_type
                        }
                        name={`dataBasic${1}`}
                        option={["Texto", "Link"]}
                      />
                    </div>
                  </div>
                  <div className="container_body">
                    <div className="container_inptut1">
                      <input defaultValue="Proceso" readOnly></input>
                    </div>
                    <div className="container_inptut2">
                      <input
                        type="text"
                        name={"Proceso"}
                        onChange={(e) => handleDescripcion(e, 1)}
                        defaultValue={
                          documentMaster.DocumentMasterHead.process_description
                        }
                        placeholder="Procesos(Obligatorio)"
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
              {dataBasicCount.map((proceso_id, index) => (
                <div
                  key={index}
                  className="container_data_basic animate__animated animate__fadeIn"
                >
                  <div className="container_sub_data_basic">
                    <div className="header">
                      <div className="container_select">
                        <InputSelect
                          id={proceso_id}
                          onclick={handleTypeSelect}
                          option={["Texto", "Link"]}
                          className={"select_columns"}
                          name={`dataBasic${proceso_id}`}
                        />
                      </div>
                      <div className="container_icons_remove">
                        <RemoveCircle
                          onClick={(e) => handleRemove(proceso_id)}
                        />
                      </div>
                    </div>
                    <div className="container_body">
                      <div className="container_inptut1">
                        <input
                          id={proceso_id}
                          placeholder="Titulo"
                          name={`Titulo${proceso_id}`}
                          onChange={(e) => handleTitle(e, proceso_id)}
                          defaultValue={dataBasic[proceso_id - 1][0].title}
                        ></input>
                      </div>
                      {dataBasic[proceso_id - 1][0].type === "Texto" ? (
                        <div className="container_inptut2">
                          <input
                            id={proceso_id}
                            placeholder="Descripcion"
                            name={`descripcion${proceso_id}`}
                            onChange={(e) => handleDescripcion(e, proceso_id)}
                            defaultValue={
                              dataBasic[proceso_id - 1][0].description
                            }
                          ></input>
                        </div>
                      ) : (
                        <div className="container_inptut2">
                          <InputLink
                            id={proceso_id}
                            placeholder="Url del sitio"
                            onChange={handleDescripcion}
                            name={`descripcion${proceso_id}`}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Pasar propiedades para el componentes de la tarjetas */}
            <div className="animate__animated animate__slideInUp">
              <ParametrizacionDocumentMasterCard
                lista={lista}
                option={option}
                ultime={ultime}
                setLista={setLista}
                setOption={setOption}
                arrayCard={arrayCard}
                setUltime={setUltime}
                res={documentMaster.res}
                listaUltime={listaUltime}
                setArrayCard={setArrayCard}
                setListaUltime={setListaUltime}
                tableColumnsTypeValue={tableColumnsTypeValue}
                handletableColumnsTypeValueChange={
                  handletableColumnsTypeValueChange
                }
              />
            </div>
            <button className="save" type="submit">
              {documentMaster.res === "success_view" ? "Actualizar" : "Guardar"}
            </button>
          </form>
          <BtnFloat onClick={handlePreview} />
        </div>
      </div>
    </div>
  );
};