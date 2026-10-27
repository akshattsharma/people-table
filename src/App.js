import React, { useState } from "react";

// Every visible string lives here so it can be matched to the design images in one place.
const TEXT = {
  title: "Add People to Table",
  name: "Name",
  age: "Age",
  place: "Place",
  add: "Add",
  clear: "Clear",
  remove: "Remove",
  empty: "No entries yet",
  action: "Action",
};

const EMPTY = { name: "", age: "", place: "" };

export default function App() {
  const [form, setForm] = useState(EMPTY);
  const [people, setPeople] = useState([]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const person = {
      id: Date.now() + Math.random(),
      name: form.name.trim(),
      age: form.age,
      place: form.place.trim(),
    };
    if (!person.name || !person.age || !person.place) return;
    setPeople((list) => [...list, person]);
    setForm(EMPTY);
  };

  const remove = (id) => setPeople((list) => list.filter((p) => p.id !== id));

  return (
    <main className="app">
      <h1>{TEXT.title}</h1>

      <form className="form" onSubmit={submit}>
        <input name="name" type="text" autoComplete="off" placeholder={TEXT.name}
          aria-label={TEXT.name} value={form.name} onChange={change} />
        <input name="age" type="number" min="0" placeholder={TEXT.age}
          aria-label={TEXT.age} value={form.age} onChange={change} />
        <input name="place" type="text" autoComplete="off" placeholder={TEXT.place}
          aria-label={TEXT.place} value={form.place} onChange={change} />
        <div className="actions">
          <button type="submit" className="btn">{TEXT.add}</button>
          <button type="button" className="btn ghost" onClick={() => setForm(EMPTY)}>{TEXT.clear}</button>
        </div>
      </form>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">{TEXT.name}</th>
              <th scope="col">{TEXT.age}</th>
              <th scope="col">{TEXT.place}</th>
              <th scope="col">{TEXT.action}</th>
            </tr>
          </thead>
          <tbody>
            {people.length === 0 ? (
              <tr>
                <td colSpan={4} className="empty">{TEXT.empty}</td>
              </tr>
            ) : (
              people.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.age}</td>
                  <td>{p.place}</td>
                  <td>
                    <button type="button" className="btn remove" onClick={() => remove(p.id)}>
                      {TEXT.remove}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
