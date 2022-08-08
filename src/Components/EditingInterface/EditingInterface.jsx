import './EditingInterface.scss';
import {useContext, useEffect, useState} from 'react';
import {EditContext, TasksContext} from '../../context/context';
import CustomButton from '../UI/CustomButton/CustomButton';

function EditingInterface() {
   const [tasks, setTasks] = useContext(TasksContext);
   const [currentTask, setCurrentTask] = useContext(EditContext);
   const [title, setTitle] = useState('');
   const [body, setBody] = useState('');
   const [currentState, setCurrentState] = useState('');

   useEffect(() => {
      setTitle(currentTask.title);
      setBody(currentTask.body);
      setCurrentState(currentTask.currentState);
   }, [currentTask]);

   const saveHandler = (evt) => {
      evt.preventDefault();
      setTasks(tasks.map((task) => {
         if (task.id === currentTask.id) {
            return {...task, title, body, currentState};
         } else {
            return task;
         }
      }));
   };

   const removeHandler = (evt) => {
      evt.preventDefault();
      setTasks(tasks.filter((task) => task.id !== currentTask.id));
      setCurrentTask({});
   };

   return (
      <div className="EditingInterface">
         {/*
            Форма редактирования отрисовывается только в случае, если выбрана какая-то задача.
         */}
         {currentTask.id &&
            <form>
               <label className="textTitle">
                  Заголовок <br/>
                  {/*
                     Решение с таким value используется потому, что при первом рендере
                     компонента стейт инпутов равен undefined из-за чего Реакт думает, что они
                     неуправлчемые и при попытке как-то на них воздействовать, Реакт ругается
                     думая, что элемент из неуправляемого делают управляемым.
                  */}
                  <input
                     type="text"
                     value={title || ''}
                     onChange={(evt) => setTitle(evt.target.value)}
                  />
               </label>
               <label className="textBody">
                  Описание <br/>
                  <textarea
                     value={body || ''}
                     onChange={(evt) => setBody(evt.target.value)}
                  />
               </label>
               <div className="controls">
                  <div className="radios">
                     <label className="waiting">
                        <input type="radio"
                               name="contact"
                               className="waiting"
                               checked={currentState === 'waiting'}
                               onChange={(evt) => setCurrentState('waiting')}
                        />
                        Ожидает
                     </label>
                     <label className="inProcess">
                        <input
                           type="radio"
                           name="contact"
                           className="inProcess"
                           checked={currentState === 'inProcess'}
                           onChange={(evt) => setCurrentState('inProcess')}
                        />
                        В процессе
                     </label>
                     <label className="done">
                        <input
                           type="radio"
                           name="contact"
                           className="done"
                           checked={currentState === 'done'}
                           onChange={(evt) => setCurrentState('done')}
                        />
                        Выполнена
                     </label>
                  </div>
                  <div className="buttons">
                     <CustomButton onClick={(evt) => saveHandler(evt)}>Сохранить</CustomButton>
                     <CustomButton onClick={(evt) => removeHandler(evt)}>Удалить</CustomButton>
                  </div>
               </div>
            </form>
         }
      </div>
   );
}

export default EditingInterface;