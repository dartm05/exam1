

const getCols= dbName=>{
    console.log(dbName);
    
fetch(`/collections/${dbName}`).then( res=>{res.json().then( colecciones =>{
    rendercolecciones(colecciones);
});
});
};



const rendercolecciones= data =>{
    console.log("got data", data);
    const target= document.getElementById("collection");
    const collect= target.querySelectorAll("#collection option");
    for (col of collect)
    {
    target.removeChild(col);
    }
    data.forEach(dato =>{
        const opcion= document.createElement("option");
        opcion.value= dato.name;
        opcion.textContent= dato.name;
        target.appendChild(opcion);
    });
    createForm(data);
}



let activate = document.getElementById("selectDbs");

activate.addEventListener("change", () => {
    dbnam = activate.value;
    getCols(dbnam);
  });


  const showdetails=(db,collect)=>{
   
    fetch(`/docs/${db}/${collect}`).then( res=>res.json()).then( docs=>{
        rendertable(docs);
    }).catch(err => console.log(err));};
    

    const rendertable = data=>{
        const head= document.createElement("thead");
        const inicio= document.getElementById("tableDetail");
        const docs= target.querySelectorAll("#tableDetail tr");
        for (doc of docs)
        {
        target.removeChild(doc);
        }
        inicio.appendChild(head);

        data.forEach(dato =>{
            const tr= document.createElement("tr");
            inicio.appendChild(tr);
            
            //luego iteramos por cada propiedad del objeto
            for(let propiedad in dato)
            {
                const td= document.createElement("td");
                td.setAttribute("id",dato[propiedad]);
                tr.appendChild(td);
                let th = document.createElement("th");
                tr.appendChild(th);
                th.textContent=propiedad;
                td.textContent = `${dato[propiedad]}`;
            }

        });
    }


    let activate2 = document.getElementById("collection");

    activate2.addEventListener("change", () => {
    colactual = activate2.value;
    showdetails(dbnam,colactual);
  });


  const createform= document.getElementById("formCreate");

  const updateform= document.getElementById("formUpdate");

  const deleteform= document.getElementById("formDelete");

  createform.addEventListener("submit", createCol);

  updateform.addEventListener("submit", updateCol);

  deleteform.addEventListener("submit", deleteCol);


  const createCol=(event)=>
  {

    const databaseName = activate.value;
    const collection = activate2.value;

    const name = document.querySelector("#formCreate input").value;
  
    const query = {
      dbName: databaseName,
      collectionName: collection,
      name: name
    };

    fetch("/databases/createCollection", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(query)
  });

  }


  