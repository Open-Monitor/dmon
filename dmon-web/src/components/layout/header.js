import React, { useState, createContext, useMemo } from 'react';

import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Autosuggest from 'react-autosuggest';

import './header.css';

import theme from './autosuggest-theme.js';

export const autoSuggestContext = createContext({
  updateSuggestions: [],
  setHandlerCb: () => {},
})

const createRenderSuggestion = (cb) => {
  return suggestion => (
    <div onClick={() => cb(suggestion.name)}>
      {suggestion.name}
    </div>
  );
}

const getSuggestions = (suggestions, value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : suggestions.filter(sug =>
    sug.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

const getSuggestionValue = suggestion => suggestion.name;

export default ({ children }) => {
  const [suggestions, updateSuggestions] = useState([]);
  const [suggestionValue, setSuggestionValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [handlerCb, setHandlerCb] = useState({fn: () => {}})

  const onSuggestionsFetchRequested = ({ value }) => {
    setFilteredSuggestions(getSuggestions(
      suggestions,
      value,
    ));
  }

  const onSuggestionsClearRequested = () => setFilteredSuggestions([]);

  const inputProps = {
    placeholder: 'Search',
    value: suggestionValue,
    onChange: (e, value) => setSuggestionValue(value.newValue)
  };

  const renderSuggestion = useMemo(
    () => createRenderSuggestion(handlerCb.fn),
    [handlerCb]
  );

  return (
    <autoSuggestContext.Provider value={{ updateSuggestions, setHandlerCb }}>
      <Navbar fixed="top" className="dark-nav px-md-5" variant="dark" expand="md">
        <Navbar.Brand href="/">
          <img className="mr-2" height="32" style={{ transform: 'translateY(-1px)' }} src={process.env.PUBLIC_URL + '/logo2.png'} alt="Open Monitor Logo" />
          <span>Open Monitor</span>
        </Navbar.Brand>
        <Navbar.Toggle className="dark-nav-toggler" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav.Item className="ml-auto" style={{backgroundColor: 'none !important'}}>
            <Autosuggest
              theme={theme}
              suggestions={filteredSuggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
            />
          </Nav.Item>
          <Nav>
            <Nav.Link className="" href="https://github.com/Open-Monitor/dmon" target="_blank">
              <img src={process.env.PUBLIC_URL + '/GitHub-Mark-Light-32px.png'} alt="Github Link" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {
        children
      }
    </autoSuggestContext.Provider>
  )
}
