import { useEffect, useState } from "react";
import { IonButton, IonContent, IonPage, IonText } from "@ionic/react";
import mailBox from "../assets/svg/mailBox.svg";
import Navbar from "../components/Navbar";
import { fruitsDatabase } from "../storage/fruitsDatabase";
import type { Fruit } from "../interfaces/fruit.interface";

export function Fruits() {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const loadFruits = async () => {
      try {
        const storedFruits = await fruitsDatabase.fruits.toArray();
        if (active) setFruits(storedFruits);
      } catch (loadError) {
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "No se pudieron cargar las frutas.",
          );
        }
      }
    };

    void loadFruits();
    return () => {
      active = false;
    };
  }, []);

  const addFruit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    try {
      const id = await fruitsDatabase.fruits.add({
        name: name.trim(),
        color: color.trim(),
      });
      setFruits((currentFruits) => [
        ...currentFruits,
        { id, name: name.trim(), color: color.trim() },
      ]);
      setName("");
      setColor("");
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "No se pudo guardar la fruta.",
      );
    }
  };

  const deleteFruit = async (id: number) => {
    setError("");
    try {
      await fruitsDatabase.fruits.delete(id);
      setFruits((currentFruits) =>
        currentFruits.filter((fruit) => fruit.id !== id),
      );
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "No se pudo borrar la fruta.",
      );
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <Navbar title="Frutas" imgUrl={mailBox} alt="Buzón morado" />
        <main className="mx-auto w-11/12 max-w-3xl p-4">
          <h2 className="mb-6 text-center text-4xl font-bold">
            Frutas (almacenamiento local)
          </h2>
          <p>Las frutas se guardan en este dispositivo con Dexie.</p>
          {error && (
            <IonText color="danger">
              <p role="alert">{error}</p>
            </IonText>
          )}
          <form
            onSubmit={addFruit}
            className="mb-8 flex flex-col gap-4 rounded-lg bg-gray-100 p-6 shadow-md"
          >
            <input
              aria-label="Nombre de la fruta"
              placeholder="Nombre"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
            <input
              aria-label="Color de la fruta"
              placeholder="Color"
              value={color}
              onChange={(event) => setColor(event.target.value)}
              required
            />
            <IonButton type="submit">Agregar fruta</IonButton>
          </form>
          <ul className="flex flex-col gap-3">
            {fruits.map((fruit) => {
              const fruitId = fruit.id;
              return (
                <li
                  key={fruitId ?? fruit.name}
                  className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm"
                >
                  <span>
                    {fruit.name} — {fruit.color}
                  </span>
                  <IonButton
                    color="danger"
                    disabled={fruitId === undefined}
                    onClick={() => {
                      if (fruitId !== undefined) void deleteFruit(fruitId);
                    }}
                    aria-label={`Borrar ${fruit.name}`}
                  >
                    Borrar
                  </IonButton>
                </li>
              );
            })}
          </ul>
        </main>
      </IonContent>
    </IonPage>
  );
}
