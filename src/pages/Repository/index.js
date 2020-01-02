import React, {Component} from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';
import Container from '../../components/Container';
import { Link } from 'react-router-dom';
import { FiLoader } from 'react-icons/fi';

import {Loading, Owner, IssueList} from './styles';

export default class Repository extends Component {

    constructor(props){
        super(props);
        this.state = {
            repository: {},
            issues: [],
            loading: 1
        }
    }

    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                repository: PropTypes.string,
            }).isRequired,
        })
    };

    async componentDidMount(){
        const {match} = this.props;

        const repoName = decodeURIComponent(this.props.match.params.repository);

        /*Para fazer mais de uma requisição ao mesmo tempo a uma API. EX:*/

        const [repository, issues] = await Promise.all([
            api.get(`/repos/${repoName}`),
            api.get(`/repos/${repoName}/issues`, {
                params:{
                    state: 'open',
                    per_page: 5,
                }
            }),
        ]);

        this.setState({
            repository: repository.data,
            issues: issues.data,
            loading: 0,
        })
        console.log(repository);
        console.log(issues);
    }

    render(){

        const { repository, issues, loading} = this.state;

        if (loading){
            return (<Loading>
                <FiLoader color="#FFF" size={30}/>
                    <h1>Carregando...</h1>
                    </Loading>)
        }
        return (
            <Container>
                <Owner>
                    <Link to="/">Voltar aos repositórios</Link>
                    <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
                    <h1>{repository.name}</h1>
                    <p>{repository.description}</p>
                </Owner>
                <IssueList>
                    {issues.map(issue => (
                        <li key={String(issue.id)}>
                            <img src={issue.user.avatar_url} alt={issue.user.login}/>
                            <div>
                                <strong>
                                <a href={issue.html_url}>{issue.title}</a>
                                {issue.labels.map(label => (
                                    <span key={String(label.id)}>{label.name}</span>
                                ))}
                                </strong>
                                <p>{issue.user.login}</p>
                            </div>
                        </li>
                    ))}
                </IssueList>
            </Container>
        )
    }
}
