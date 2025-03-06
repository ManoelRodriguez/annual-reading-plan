import { useState, useEffect } from 'react';
import { Table } from './components/Table';
import './styles.css'
import '.././global.css'

function App() {
  const oldTestment = [
    { name: "Gênesis", chapters: 50 },
    { name: "Êxodo", chapters: 40 },
    { name: "Levítico", chapters: 27 },
    { name: "Números", chapters: 36 },
    { name: "Deuteronômio", chapters: 34 },
    { name: "Josué", chapters: 24 },
    { name: "Juízes", chapters: 21 },
    { name: "Rute", chapters: 4 },
    { name: "1 Samuel", chapters: 31 },
    { name: "2 Samuel", chapters: 24 },
    { name: "1 Reis", chapters: 22 },
    { name: "2 Reis", chapters: 25 },
    { name: "1 Crônicas", chapters: 29 },
    { name: "2 Crônicas", chapters: 36 },
    { name: "Esdras", chapters: 10 },
    { name: "Neemias", chapters: 13 },
    { name: "Ester", chapters: 10 },
    { name: "Jó", chapters: 42 },
    { name: "Salmos", chapters: 150 },
    { name: "Provérbios", chapters: 31 },
    { name: "Eclesiastes", chapters: 12 },
    { name: "Cânticos", chapters: 8 },
    { name: "Isaías", chapters: 66 },
    { name: "Jeremias", chapters: 52 },
    { name: "Lamentações", chapters: 5 },
    { name: "Ezequiel", chapters: 48 },
    { name: "Daniel", chapters: 12 },
    { name: "Oseias", chapters: 14 },
    { name: "Joel", chapters: 3 },
    { name: "Amós", chapters: 9 },
    { name: "Obadias", chapters: 1 },
    { name: "Jonas", chapters: 4 },
    { name: "Miqueias", chapters: 7 },
    { name: "Naum", chapters: 3 },
    { name: "Habacuque", chapters: 3 },
    { name: "Sofonias", chapters: 3 },
    { name: "Ageu", chapters: 2 },
    { name: "Zacarias", chapters: 14 },
    { name: "Malaquias", chapters: 4 }
  ];

  const newTestament = [
    { name: "Mateus", chapters: 28 },
    { name: "Marcos", chapters: 16 },
    { name: "Lucas", chapters: 24 },
    { name: "João", chapters: 21 },
    { name: "Atos", chapters: 28 },
    { name: "Romanos", chapters: 16 },
    { name: "1 Coríntios", chapters: 16 },
    { name: "2 Coríntios", chapters: 13 },
    { name: "Gálatas", chapters: 6 },
    { name: "Efésios", chapters: 6 },
    { name: "Filipenses", chapters: 4 },
    { name: "Colossenses", chapters: 4 },
    { name: "1 Tessalonicenses", chapters: 5 },
    { name: "2 Tessalonicenses", chapters: 3 },
    { name: "1 Timóteo", chapters: 6 },
    { name: "2 Timóteo", chapters: 4 },
    { name: "Tito", chapters: 3 },
    { name: "Filemom", chapters: 1 },
    { name: "Hebreus", chapters: 13 },
    { name: "Tiago", chapters: 5 },
    { name: "1 Pedro", chapters: 5 },
    { name: "2 Pedro", chapters: 3 },
    { name: "1 João", chapters: 5 },
    { name: "2 João", chapters: 1 },
    { name: "3 João", chapters: 1 },
    { name: "Judas", chapters: 1 },
    { name: "Apocalipse", chapters: 22 }
  ];

  const monthsOf25 = [
    { name: 'Janeiro', days: 31 },
    { name: 'Fevereiro', days: 28 },
    { name: 'Março', days: 31 },
    { name: 'Abril', days: 30 },
    { name: 'Maio', days: 31 },
    { name: 'Junho', days: 30 },
    { name: 'Julho', days: 31 },
    { name: 'Agosto', days: 31 },
    { name: 'Setembro', days: 30 },
    { name: 'Outubro', days: 31 },
    { name: 'Novembro', days: 30 },
    { name: 'Dezembro', days: 31 }
  ];

  function returningChaptersOfBooks() {
    let currentDay = 15;
    let currentMonthIndex = monthsOf25.findIndex(month => month.name === "Março");

    let oldTestamentIndex = oldTestment.findIndex(book => book.name === "Números");
    let oldTestamentChapter = 15;

    let newTestamentIndex = 0;
    let newTestamentChapter = 1;

    let readingPlan = [];

    while (oldTestamentIndex < oldTestment.length || newTestamentIndex < newTestament.length) {
      let oldChapters = [];
      let currentBookName = oldTestment[oldTestamentIndex]?.name || "";

      // Leitura do Antigo Testamento (3 capítulos por dia)
      while (oldChapters.length < 3 && oldTestamentIndex < oldTestment.length) {
        let currentBook = oldTestment[oldTestamentIndex];

        if (oldTestamentChapter > currentBook.chapters) {
          oldTestamentIndex++;
          oldTestamentChapter = 1;
          if (oldTestamentIndex >= oldTestment.length) break;
          currentBook = oldTestment[oldTestamentIndex];
          currentBookName = currentBook.name;
        }

        oldChapters.push(oldTestamentChapter);
        oldTestamentChapter++;
      }

      // Formatação para evitar repetição do nome do livro
      let formattedOldTestament = oldChapters.length > 0 ? `${currentBookName} ${oldChapters.join(", ")}` : "";

      // Leitura do Novo Testamento (1 capítulo por dia)
      let newChapterEntry = null;
      if (newTestamentIndex < newTestament.length) {
        let newBook = newTestament[newTestamentIndex];

        if (newTestamentChapter > newBook.chapters) {
          newTestamentIndex++;
          newTestamentChapter = 1;
          if (newTestamentIndex < newTestament.length) {
            newBook = newTestament[newTestamentIndex];
          }
        }

        if (newTestamentIndex < newTestament.length) {
          newChapterEntry = `${newBook.name} ${newTestamentChapter}`;
          newTestamentChapter++;
        }
      }

      // Criar entrada para o plano de leitura
      readingPlan.push({
        day: currentDay,
        month: monthsOf25[currentMonthIndex].name,
        oldTestament: formattedOldTestament,
        newTestament: newChapterEntry
      });

      currentDay++;
      if (currentDay > monthsOf25[currentMonthIndex].days) {
        currentDay = 1;
        currentMonthIndex++;
      }
    }

    return readingPlan;
  }



  const readingPlan = returningChaptersOfBooks();

  return (
    <div className='bg-light'>
      <h1 className='d-flex justify-content-center p-3'>Leitura Bíblica Anual</h1>
      <div className='d-flex justify-content-center align-items-start flex-wrap'>
        {monthsOf25.map((month, monthIndex) => (
          <div key={monthIndex}>
            <Table readingPlan={readingPlan} month={month} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
