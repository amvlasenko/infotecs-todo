import './AddTaskModal.scss';
import {useContext, useState} from 'react';
import {ModalContext, TasksContext} from '../../context/context';
import CustomButton from '../UI/CustomButton/CustomButton';

function AddTaskModal() {
   const [isModalOpen, setIsModalOpen] = useContext(ModalContext);
   const [tasks, setTasks] = useContext(TasksContext);
   const [modalTitle, setModalTitle] = useState('');
   const [modalBody, setModalBody] = useState('');

   const postNewTask = (evt) => {
      evt.preventDefault();
      const task = {
         id: Date.now(),
         title: modalTitle,
         body: modalBody,
         currentState: 'waiting'
      };
      setTasks(arr => [...arr, task]);
      setIsModalOpen(false);
   };

   const closeModal = (evt) => {
      evt.preventDefault();
      setIsModalOpen(false);
   };

   return (
      <div className="AddTaskModal">
         <form>
            <label className="textTitle">
               Заголовок <br/>
               {/*
                  Решение с таким value используется потому, что при первом рендере
                  компонента стейт инпутов равен undefined из-за чего Реакт думает, что они
                  неуправлчемые и при попытке как-то на них воздействовать, Реакт ругается
                  думая, что элемент из неуправляемого делают управляемым.
               */}
               <input type="text"
                      value={modalTitle || ''}
                      onChange={(evt) => setModalTitle(evt.target.value)}
                      autoFocus
               />
            </label>
            <label className="textBody">
               Описание <br/>
               <textarea
                  value={modalBody || ''}
                  onChange={(evt) => setModalBody(evt.target.value)}
               />
            </label>
            <div className="controls">
               <div className="buttons">
                  <CustomButton onClick={(evt) => postNewTask(evt)}>Сохранить</CustomButton>
                  <CustomButton onClick={(evt) => closeModal(evt)}>Отмена</CustomButton>
               </div>
            </div>
         </form>
      </div>
   );
}

export default AddTaskModal;