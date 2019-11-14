export default ({
  container: {
    marginRight: '1.5rem',
  },
  suggestionsContainer: {
    position: 'absolute',
    backgroundColor: '#222437',
    padding: '10px -30px',
    width: '200px',
    borderLeft: '2px solid #181a27',
    borderRight: '2px solid #181a27',
    borderBottom: '2px solid #181a27',
    boxShadow: '0 2px 4px 0 #181a27',
  },
  suggestion: {
    listStyleType: 'none',
    padding: '10px 0px 0px 0px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  suggestionHighlighted: {
    listStyleType: 'none',
    padding: '10px 0px 0px 0px',
    cursor: 'pointer',
    color: 'rgba(255,255,255,0.4)',
  },
  suggestionList: {
    padding: '0px',
  },
  input: {
    backgroundColor: '#1c1e2f',
    width: '200px',
    border: '1px solid rgba(255,255,255,0.7)',
    borderRadius: '3px',
    paddingLeft: '15px',
    color: 'white',
    height: '32px',
    letterSpacing: '2px',
  }
})
