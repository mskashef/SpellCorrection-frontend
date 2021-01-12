import React, {useState} from 'react';
import './App.module.css';
import classes from './App.module.css'

function App() {
    const [query, setQuery] = useState('');
    const [resultQueries, setResultQueries] = useState([]);
    const [resultTokens, setResultTokens] = useState({});

    const json = (response) => {
        return response.json()
    };

    const correct = () => {
        fetch(`/api/correct?query=${query}`)
            .then(json)
            .then((data) => {
                setResultQueries(data.corrected_queries);
                setResultTokens(data.corrected_tokens);
                console.log('Request succeeded with JSON response', data);
            }).catch(console.log);
    };

    return (
        <div className="App">
            <div className={classes.searchInputWrapper}>
                <input type={"text"} value={query} onChange={(e) => setQuery (e.target.value)} />
                <input type={'button'} value={'Correct'} onClick={correct}/>
            </div>
            <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'center'}}>
                <table className={classes.table} cellSpacing={0} cellPadding={0}>
                    <tr>
                        <td>Query Suggestions</td>
                    </tr>
                    {
                        resultQueries.map(q => <tr><td>{q}</td></tr>)
                    }
                </table>
                <table className={classes.table} cellSpacing={0} cellPadding={0}>
                    <tr>
                        <td>Suggestions</td>
                        <td>Token</td>
                    </tr>
                    {
                        Object.keys(resultTokens).map(q => (
                            <tr>
                                <td>{resultTokens[q].join('، ')}</td>
                                <td>{q}</td>
                            </tr>
                        ))
                    }
                </table>
            </div>
        </div>
    );
}

export default App;
