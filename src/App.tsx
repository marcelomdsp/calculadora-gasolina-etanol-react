import { useState, FormEvent } from "react";
import logoImg from "./assets/logo.png";
import "./App.css";

interface infoProps {
  titulo: string;
  gasolina: string | number;
  alcool: string | number;
}

function App() {
  const [gasolinaInput, setGasolinaInput] = useState(0);
  const [alcoolInput, setAlcoolInput] = useState(0);
  const [info, setInfo] = useState<infoProps>();

  function calcular(event: FormEvent) {
    event.preventDefault();

    if (!alcoolInput || !gasolinaInput) {
      alert("Dados inválidos! Digite apenas números.");
      return;
    }

    let resultado = alcoolInput / gasolinaInput;

    if (resultado <= 0.7) {
      setInfo({
        titulo: "Compensa usar álcool",
        alcool: formatarMoeda(alcoolInput),
        gasolina: formatarMoeda(gasolinaInput),
      });
    } else {
      setInfo({
        titulo: "Compensa usar gasolina",
        alcool: formatarMoeda(alcoolInput),
        gasolina: formatarMoeda(gasolinaInput),
      });
    }
  }

  function formatarMoeda(valor: number) {
    let valorFormatado = valor.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
    return valorFormatado;
  }

  return (
    <div>
      <main className="container">
        <img
          className="logo"
          src={logoImg}
          alt="Logo da calculadora de gasolina ou álcool"
        />
        <h1 className="titulo">Qual melhor Opção?</h1>

        <form action="" onSubmit={calcular}>
          <label htmlFor="">Álcool (preço por litro)</label>
          <input
            type="text"
            inputMode="decimal"
            className="input"
            required
            // value={alcoolInput}
            onChange={(e) =>
              setAlcoolInput(Number(e.target.value.replace(",", ".")))
            }
          />

          <label htmlFor="">Gasolina (preço por litro)</label>
          <input
            type="text"
            inputMode="decimal"
            className="input"
            min="1"
            step="0.01"
            required
            // value={gasolinaInput}
            onChange={(e) =>
              setGasolinaInput(Number(e.target.value.replace(",", ".")))
            }
          />
          <input className="button" type="submit" value="Calcular" />
        </form>

        {info && Object.keys(info).length > 0 && (
          <section className="resultado">
            <h2 className="resultado-txt">{info.titulo}</h2>

            <span>Álcool {info.alcool}</span>
            <span>Gasolina {info.gasolina}</span>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
