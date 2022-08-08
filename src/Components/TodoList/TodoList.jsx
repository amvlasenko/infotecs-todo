import './TodoList.scss';
import {useContext, useEffect, useState} from 'react';
import {ModalContext, SearchContext, TasksContext} from '../../context/context';
import ListElement from '../ListElement/ListElement';
import Search from '../Search/Search';
import CustomButton from '../UI/CustomButton/CustomButton';

function TodoList() {
   const [tasksList, setTasksList] = useContext(TasksContext);
   const [search, setSearch] = useContext(SearchContext);
   const [isModalOpen, setIsModalOpen] = useContext(ModalContext);
   const [localTasksList, setLocalTasksList] = useState(tasksList);

   // Если пользователь что-то вводит в поле поиска, то создается локальный стейт с постами,
   // которые нашлись в общем списке.
   useEffect(() => {
      setLocalTasksList(tasksList.filter((task) => task.title.toLowerCase().includes(search.toLowerCase())));
   }, [search]);

   const addBtnHandler = (evt) => {
      evt.preventDefault();
      setIsModalOpen(true);
   };

   return (
      <div className="TodoList">
         <ul>
            <li>
               <Search placeholder={'Поиск задачи'}/>
            </li>
            <li className="legendElement">
               <div className="waiting">Ожидает</div>
               <div className="inProcess">В процессе</div>
               <div className="done">Выполнена</div>

            </li>
            {/*
               Условная отрисовка на случай, если поиск ничего не найдет и на случай,
               если список задач будет пустым. В этих случаях будет отображено информационное сообщение.
            */}
            {
               search
                  ? localTasksList.length > 0
                     ? localTasksList.map((task) => <ListElement key={task.id} task={task}/>)
                     : <span className="searchFail">Ничего не найдено</span>
                  : tasksList.length > 0
                     ? tasksList.map((task) => <ListElement key={task.id} task={task}/>)
                     : <span className="tasksEmpty">Задач не запланировано</span>
            }
            <CustomButton className="CustomButton" onClick={(evt) => addBtnHandler(evt)}>Добавить задачу</CustomButton>
         </ul>
      </div>
   );
}

export default TodoList;