// Отдельный файл для создания контекстов, чтобы не усложнять компоненты.
import React from 'react';

export const TasksContext = React.createContext();
export const SearchContext = React.createContext();
export const EditContext = React.createContext();
export const ModalContext = React.createContext();