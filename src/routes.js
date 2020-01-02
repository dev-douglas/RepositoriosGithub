/*Importar esse componente de rotas no app.js*/
import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
/*
BrowserRouter: permite a navegação entre paginas pela URL
Switch: Garante que apenas uma rota seja chamada por momento
Route: cada route representa uma página da aplicação
*/

import Main from './pages/Main';
import Repository from './pages/Repository';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main}/>
                <Route path="/repository/:repository" component={Repository}/>
            </Switch>
        </BrowserRouter>
    );
}
