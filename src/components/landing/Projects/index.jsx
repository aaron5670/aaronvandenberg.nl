import React, {useState, useEffect} from 'react'
import {Container, Card} from 'components/common'
import starIcon from 'assets/icons/star.svg'
import forkIcon from 'assets/icons/fork.svg'
import {Wrapper, Grid, Item, Content, Stats} from './styles'
import {TOTAL_GITHUB_PROJECTS, GITHUB_USERNAME} from "../../../../config";

const IndexPage = () => {
    const [userRepos, setUserRepos] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, isError] = useState(false);
    useEffect(() => {
        // get data from GitHub api
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated`)
            .then(response => response.json())
            .then(resultData => {
                if (resultData.message) throw new Error('Something went wrong');
                //Sort on total stars
                return resultData.sort((a, b) => b.stargazers_count - a.stargazers_count)
            })
            .then(resultData => {
                if (resultData.message) throw new Error('Something went wrong');
                //Remove forked repositories
                return resultData.filter((repo) => repo.fork !== true)
            })
            .then(resultData => {
                if (resultData.length > TOTAL_GITHUB_PROJECTS) resultData.splice(TOTAL_GITHUB_PROJECTS, resultData.length);
                setUserRepos(resultData);
                return setIsLoading(false);
            })
            .catch((error) => {
                isError(true);
            })
    }, []);

    if (!isLoading) {
        if (userRepos) {
            return userRepos.map((repo) => {
                return (
                    <Item
                        key={repo.id}
                        as="a"
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Card>
                            <Content>
                                <h4>{repo.name}</h4>
                                <p>{repo.description}</p>
                            </Content>
                            <Stats>
                                <div>
                                    <img src={starIcon} alt="stars"/>
                                    <span>{repo.stargazers_count}</span>
                                </div>
                                <div>
                                    <img src={forkIcon} alt="forks"/>
                                    <span>{repo.forks}</span>
                                </div>
                            </Stats>
                        </Card>
                    </Item>
                )
            })
        }
    } else {
        if (isError) return  ErrorNotification();
        return <p>Loading projects...</p>;
    }
};

const ErrorNotification = () => (
    <p>Error while fetching GitHub repositories from user
        <a href={`https://github.com/${GITHUB_USERNAME}`} target={'_blank'}> {GITHUB_USERNAME}</a>.
    </p>
);

export const Projects = () => {
    return (
        <Wrapper as={Container} id="projects">
            <h2>Projects</h2>
            <Grid>
                {IndexPage()}
            </Grid>
        </Wrapper>
    )
};
