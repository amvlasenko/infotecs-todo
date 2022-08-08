import './Search.scss';
import {useContext} from 'react';
import {SearchContext} from '../../context/context';

function Search(props) {
   const placeholder = props.placeholder;
   const [search, setSearch] = useContext(SearchContext);

   const searchHandler = (evt) => {
      evt.preventDefault();
      setSearch(evt.target.value);
   };

   return (
      <div className="Search">
         {/*
            Решение с таким value используется потому, что при первом рендере
            компонента стейт инпутов равен undefined из-за чего Реакт думает, что они
            неуправлчемые и при попытке как-то на них воздействовать, Реакт ругается
            думая, что элемент из неуправляемого делают управляемым.
         */}
         <input placeholder={placeholder} value={search || ''} onChange={(evt) => searchHandler(evt)}/>
      </div>
   );
}

export default Search;