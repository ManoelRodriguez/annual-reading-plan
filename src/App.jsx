import { useState } from 'react'
import { Table } from './components/Table'

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
  ]

  const newTestment = [
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
  ]

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
  ]

  let countDays = 0;
  let remainingChapters = [];
  let previousBook = "";

  function returningChaptersOfBooks() {
    let remainingChapters = [];
    let previousBook = "";
    let currentDay = 15; // Começa em 15 de março
    let currentMonthIndex = monthsOf25.findIndex(month => month.name === "Março");

    let startBookIndex = oldTestment.findIndex(book => book.name === "Números");
    let startChapter = 15;

    for (let i = startBookIndex; i < oldTestment.length; i++) {
      let book = oldTestment[i];
      let bookChapters = book.chapters;
      let currentChapter = i === startBookIndex ? startChapter : 1;

      while (currentChapter <= bookChapters) {
        let chaptersToRead = [];
        let bookNames = [];

        // Se houver capítulos pendentes do livro anterior, leia primeiro
        if (remainingChapters.length > 0) {
          chaptersToRead = [...remainingChapters];
          bookNames.push(previousBook);
          remainingChapters = [];
        }

        // Preenche o restante do dia com capítulos do livro atual
        while (chaptersToRead.length < 3 && currentChapter <= bookChapters) {
          chaptersToRead.push(currentChapter);
          bookNames.push(book.name);
          currentChapter++;
        }

        // Remove duplicatas no nome do livro
        bookNames = [...new Set(bookNames)];

        // Evita repetir os últimos capítulos de um livro no dia seguinte
        if (chaptersToRead.length < 3 && i < oldTestment.length - 1) {
          remainingChapters = [...chaptersToRead];
          previousBook = book.name;
          continue; // Pula para o próximo livro sem imprimir o dia incompleto
        }

        // Obtém o nome do mês atual
        let currentMonth = monthsOf25[currentMonthIndex].name;

        console.log(
          `${currentDay} de ${currentMonth} ---> ${bookNames.map((b, index) =>
            `${b} - ${chaptersToRead.slice(index * 3, (index + 1) * 3).join(", ")}`).join(" | ")}`
        );

        // **Parar no último capítulo de Malaquias**
        if (book.name === "Malaquias" && currentChapter > bookChapters) {
          console.log("📖 Leitura do Antigo Testamento concluída!");
          return;
        }

        // Avança para o próximo dia e mês, se necessário
        currentDay++;
        if (currentDay > monthsOf25[currentMonthIndex].days) {
          currentDay = 1;
          currentMonthIndex++;
        }
      }
    }
  }



  returningChaptersOfBooks();

  function joinBooks() {

  }

  function generatingReadingPlan() {
    let count = 0
    for (let i = 0; i < monthsOf25.length; i++) {
      //console.log(monthsOf25[i].name)
      let days = monthsOf25[i].days
      console.log(`----------${monthsOf25[i].name}----------`)
      for (let j = 1; j <= days; j++) {
        console.log(j)
        count++
      }
    }
    console.log(`Número de dias: ${count}`)
  }

  /* generatingReadingPlan() */
  returningChaptersOfBooks()

  return (
    <div>
      <h1>Leitura Bíblica Anual</h1>
      <ul>
        {oldTestment.map(book => {
          return <li>{book.name} - {book.chapters}</li>
        })}
      </ul>
      <Table />
    </div>
  )
}

export default App
