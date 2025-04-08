// App.jsx
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Upload } from "lucide-react";
import AnimeItem from "./AnimeItem";
import BuscaAnime from "@/components/BuscaAnime";

function App() {
  const [listaAnimes, setListaAnimes] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState("Todos");
  const [busca, setBusca] = useState("");
  const [mostrarImportExport, setMostrarImportExport] = useState(false);
  const inputAdicionar = useRef();

  useEffect(() => {
    const armazenado = localStorage.getItem("animes");
    if (armazenado) {
      setListaAnimes(JSON.parse(armazenado));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("animes", JSON.stringify(listaAnimes));
  }, [listaAnimes]);

  const adicionarAnime = () => {
    const valorInput = inputAdicionar.current.value.trim();
    if (!valorInput) return;

    const novoAnime = {
      id: Date.now(),
      nome: valorInput,
      status: "Planejado",
      descricao: "",
      episodiosAssistidos: 0,
      totalEpisodios: 0,
      prioridade: listaAnimes.length,
    };

    setListaAnimes((prev) => [...prev, novoAnime]);
    inputAdicionar.current.value = "";
  };

  const importarLista = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = JSON.parse(event.target.result);
      setListaAnimes(data);
    };
    reader.readAsText(file);
  };

  const exportarLista = () => {
    const blob = new Blob([JSON.stringify(listaAnimes, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "minha-lista-animes.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const listaFiltrada = listaAnimes
    .filter((anime) =>
      filtroStatus === "Todos" ? true : anime.status === filtroStatus
    )
    .filter((anime) => anime.nome.toLowerCase().includes(busca.toLowerCase()))
    .sort((a, b) => a.prioridade - b.prioridade);

  return (
    <div className="min-h-screen bg-background text-foreground p-4 flex flex-col items-center">
      <Card className="w-full max-w-2xl z-10">
        <CardContent className="p-4 sm:p-6 flex flex-col gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-center">
            Minha Lista de Animes
          </h1>

          <Button
            onClick={() => setMostrarImportExport(!mostrarImportExport)}
            className="self-end"
            variant="outline"
          >
            {mostrarImportExport ? "Ocultar Import/Export" : "Mostrar Import/Export"}
          </Button>

          {mostrarImportExport && (
            <div className="flex flex-col sm:flex-row gap-2 items-center">
              <Button variant="outline" onClick={exportarLista} className="w-full sm:w-auto">
                <Upload className="w-4 h-4 mr-2" /> Exportar Lista
              </Button>
              <label className="w-full sm:w-auto cursor-pointer flex items-center gap-2 border rounded px-4 py-2">
                <Download className="w-4 h-4" /> Importar Lista
                <input type="file" accept="application/json" onChange={importarLista} className="hidden" />
              </label>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <BuscaAnime
              adicionarAnime={(anime) =>
                setListaAnimes((prev) => [
                  ...prev,
                  {
                    ...anime,
                    id: Date.now(),
                    episodiosAssistidos: 0,
                    prioridade: prev.length,
                  },
                ])
              }
            />

            <div className="flex gap-2">
              <Input
                ref={inputAdicionar}
                placeholder="Nome manual"
                className="w-full"
              />
              <Button onClick={adicionarAnime}>Adicionar</Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 justify-between items-center">
            <Input
              placeholder="Buscar anime..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full sm:w-1/2"
            />

            <select
              className="border px-2 py-1 rounded w-full sm:w-1/2"
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
            >
              <option value="Todos">Todos</option>
              <option value="Planejado">Planejado</option>
              <option value="Assistindo">Assistindo</option>
              <option value="Concluído">Concluído</option>
            </select>
          </div>

          {listaFiltrada.length > 0 ? (
            <ul className="flex flex-col gap-3">
              {listaFiltrada.map((anime, index) => (
                <AnimeItem
                  key={anime.id}
                  anime={anime}
                  index={listaAnimes.findIndex((a) => a.id === anime.id)}
                  listaAnimes={listaAnimes}
                  setListaAnimes={setListaAnimes}
                />
              ))}
            </ul>
          ) : (
            <p className="text-center text-muted-foreground">
              Nenhum anime encontrado com os filtros atuais.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
