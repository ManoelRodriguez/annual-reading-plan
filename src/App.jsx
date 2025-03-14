import { Table } from './components/Table/Table';
import '../global.css'
import { Navbar } from './components/Navbar/Navbar';
import { oldTestament, newTestament } from './data/bibleBooks'
function App() {

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

  function generateReadingPlan() {
    let currentDay = 20;
    let currentMonthIndex = monthsOf25.findIndex(month => month.name === "Março");

    let oldTestamentIndex = oldTestament.findIndex(book => book.name === "Números");
    let oldTestamentChapter = 15;

    let newTestamentIndex = newTestament.findIndex(book => book.name === "Marcos");
    let newTestamentChapter = 1;

    let readingPlan = [];

    while (oldTestamentIndex < oldTestament.length || newTestamentIndex < newTestament.length) {
      let oldChapters = [];
      let currentBookName = oldTestament[oldTestamentIndex]?.name || "";

      // Leitura do Antigo Testamento (3 capítulos por dia)
      while (oldChapters.length < 3 && oldTestamentIndex < oldTestament.length) {
        let currentBook = oldTestament[oldTestamentIndex];

        if (oldTestamentChapter > currentBook.chapters) {
          oldTestamentIndex++;
          oldTestamentChapter = 1;
          if (oldTestamentIndex >= oldTestament.length) break;
          currentBook = oldTestament[oldTestamentIndex];
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

  const readingPlan = generateReadingPlan();

  return (
    <div className='bg-light'>
      <Navbar />
      <div className='d-flex justify-content-center align-items-start flex-wrap mt-4'>
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
