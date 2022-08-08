import './ListElement.scss';
import {useContext} from 'react';
import {EditContext} from '../../context/context';

function ListElement(props) {
   const task = props.task;
   const [currentTask, setCurrentTask] = useContext(EditContext);

   const clickHandler = () => {
      setCurrentTask(task);
   };

   return (
      // Добавление класса "current", если данный элемент является текущим выбранным для редактирования.
      <li className={`ListElement ${task.currentState} ${currentTask.id === task.id ? 'current' : ''} `}
          onClick={() => {
             clickHandler();
          }} tabIndex="0">
         <span>{task.title}</span>
      </li>
   );
}

export default ListElement;