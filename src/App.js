import './App.scss';
import TodoList from './Components/TodoList/TodoList';
import EditingInterface from './Components/EditingInterface/EditingInterface';
import {EditContext, ModalContext, SearchContext, TasksContext} from './context/context';
import {useState} from 'react';
import AddTaskModal from './Components/AddTaskModal/AddTaskModal';

function App() {

   // Контекст использует сравнение по ссылкам, чтобы определить, когда запускать последующий рендер.
   // Из-за этого существуют некоторые подводные камни, например, случайные повторные рендеры потребителей,
   // при перерендере родителя Provider-компонента. Один из вариантов решения этой проблемы — хранение этого
   // объекта в состоянии родительского компонента.
   // https://ru.reactjs.org/docs/context.html#caveats

   // Начальное состояние для демонстрации. Можно сохранять задачи в localStorage.
   const [tasksList, setTasksList] = useState([
      {
         id: 1,
         title: 'Купить кота',
         body: 'Покупка кота — волнительное событие, но важно заранее изучить большое количество информации, чтобы не участвовать в финансировании безответственного разведения, а также чтобы быть уверенными, что вы принесете домой здоровое животное.',
         currentState: 'waiting'
      },
      {id: 2, title: 'Погладить кота', body: '', currentState: 'inProcess'},
      {id: 3, title: 'Накормить кота чтобы он был доволен', body: '', currentState: 'done'},
      {id: 4, title: 'Boop the Floof!', body: 'https://www.youtube.com/watch?v=wj-iI3escpk', currentState: 'waiting'}
   ]);
   const [search, setSearch] = useState('');
   const [currentTask, setCurrentTask] = useState({});
   const [isModalOpen, setIsModalOpen] = useState(false);


   // Логика колонок основного макета приложения:
   // Подставляем заданную пользователем ширину в макет.
   const [colWidth, setColWidth] = useState(250);
   const templateWidth = {
      gridTemplateColumns: `${colWidth}px auto`
   };
   const widthManipulatorPosition = {
      left: `${colWidth}px`
   };

   const mouseHandler = (evt) => {
      const startSize = colWidth;
      const startPosition = evt.pageX;

      document.body.addEventListener('mousemove', onMouseMove);
      document.body.addEventListener('mouseup', onMouseUp);

      function onMouseMove(evt) {
         // Считаем один раз чтобы не производить лишних вычислений, затем подставляем на проверку.
         const newSize = startSize - startPosition + evt.pageX;
         setColWidth(
            // Проверка нужна для того, чтобы пользователь не мог полностью скрыть список задач.
            newSize > 125 ? newSize : 125
         );
      }

      function onMouseUp() {
         document.body.removeEventListener('mousemove', onMouseMove);
         document.body.removeEventListener('mouseup', onMouseUp);
      }
   };

   return (
      <div className="App" style={templateWidth}>
         <TasksContext.Provider value={[tasksList, setTasksList]}>
            <SearchContext.Provider value={[search, setSearch]}>
               <EditContext.Provider value={[currentTask, setCurrentTask]}>
                  <ModalContext.Provider value={[isModalOpen, setIsModalOpen]}>
                     <TodoList/>
                     <div className="widthManipulator"
                          style={widthManipulatorPosition}
                          onMouseDown={(evt) => mouseHandler(evt)}>
                     </div>
                     <EditingInterface/>
                     {
                        isModalOpen && <AddTaskModal/>
                     }
                  </ModalContext.Provider>
               </EditContext.Provider>
            </SearchContext.Provider>
         </TasksContext.Provider>
      </div>
   );
}

export default App;
