import React, { useState, useRef,useEffect } from "react";
import "./App.css";

function App() {
  const Dateref = useRef();
  const Montantref = useRef();
  const Descriptionref = useRef();
  const categorieref = useRef();
  const filterref = useRef();
  const [Transaction, setTransaction] = useState([]);
  const [filtredTransaction, setfiltredTransaction] = useState([]);
  //------------------------------------------------------

  const addtransaction = () => {

    const date = Dateref.current.value;
    const montant = Montantref.current.value;
    const description = Descriptionref.current.value;
    const categorie = categorieref.current.value;
    const item = {
      Date: date,
      Montant: montant,
      Description: description,
      Categorie: categorie,
    };
    if(date&&montant&&description&&categorie){
      setTransaction([...Transaction, item]);
    }else {
      alert("Veuillez remplir tous les champs")
    }
    

    console.log(Transaction);
    Dateref.current.value = "";
    Montantref.current.value = "";
    Descriptionref.current.value = "";
    categorieref.current.value = "";
  };

  useEffect(() => {
    setfiltredTransaction(Transaction);
  }, [Transaction]);

  const Supprimer = (index) => {
    const newlist = Transaction.filter((item, i) => i !== index);
    setTransaction(newlist);
  };

  const filtrer = () => {
    const filteritem = filterref.current.value;
    if (filteritem !== "Tous") {
      const newlist = filtredTransaction.filter(
        (item) => item.Categorie === filteritem
      );
      setfiltredTransaction(newlist);
    } else if (filteritem === "Tous") {
      setfiltredTransaction(Transaction);
    }
  };
  //-----------------------------------------------------------
  return (
    <>
      <div className="body">
        <section>
          <h1 id="title">Suivi des Finances Personnelles</h1>
          <div className="inputs-conatiner">
            <input ref={Dateref} className="input-all" type="date" />
            <input
              ref={Montantref}
              placeholder="Montant"
              className="input-all"
              type="number"
            />
            <select
              ref={categorieref}
              className="input-all"
              name="Categorie"
              required
            >
              <option className="input-all" value="" disabled selected hidden>
                Categorie
              </option>
              <option value="Alimentation">Alimentation</option>
              <option value="Loisirs">Loisirs</option>{" "}
              <option value="Transport">Transport</option>{" "}
              <option value="Logement">Logement</option>
              <option value="Services">Services</option>
              <option value="Sante">Sante</option>
              <option value="Education">Education</option>
              <option value="Autres">Autres</option>
            </select>
            <input
              ref={Descriptionref}
              placeholder="Description"
              className="input-all"
              type="text"
            />
            <button id="ajouter-button" onClick={() => addtransaction()}>
              Ajouter Transaction
            </button>
          </div>
          <div className="affichage">
            <div className="filtre-categorie">
              <h2>Filtrer par categorie:</h2>
              <select
                ref={filterref}
                
                className="filte"
                name="Categorie"
                required
              >
                <option className="input-all" value="" disabled selected hidden>
                  Tous
                </option>
                <option value="Tous">Tous</option>
                <option value="Alimentation">Alimentation</option>
                <option value="Loisirs">Loisirs</option>{" "}
                <option value="Transport">Transport</option>{" "}
                <option value="Logement">Logement</option>
                <option value="Services">Services</option>
                <option value="Sante">Sante</option>
                <option value="Education">Education</option>
                <option value="Autres">Autres</option>
              </select>
              <button id="filtrer-button" onClick={() => filtrer()}>Filtrer</button>
            </div>
            <div className="affichage-elements">
              <h2>Repartition des Depenses:</h2>
              <div className="Transactions">
                {filtredTransaction.map((item, index) => (
                  <div className="transaction" key={index}>
                    <p className="Transaction-elements">
                      {" "}
                      Montant:&nbsp; <span>{item.Montant}DH</span>
                    </p>
                    <p className="Transaction-elements">
                      Description:&nbsp; <span>{item.Description}</span>
                    </p>
                    <p className="Transaction-elements">
                      Date:&nbsp; <span>{item.Date}</span>
                    </p>
                    <p className="Transaction-elements">
                      Categorie:&nbsp; <span>{item.Categorie}</span>
                    </p>
                    <button id="supprimer" onClick={() => Supprimer(index)}>
                      Supprimer
                    </button>
                    <hr />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
