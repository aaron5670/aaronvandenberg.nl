import React, {useState, useEffect} from 'react'
import {Container, Card} from 'components/common'
import starIcon from 'assets/icons/star.svg'
import forkIcon from 'assets/icons/fork.svg'
import {Wrapper, Grid, Item, Content, Stats} from './styles'

const IndexPage = () => {
        // Client-side Runtime Data Fetching
        const [userRepos, setUserRepos] = useState();
        const [isLoading, setIsLoading] = useState(true);
        useEffect(() => {
            // get data from GitHub api
            fetch(`https://api.github.com/users/aaron5670/repos?sort=updated`)
                .then(response => response.json())
                .then(resultData => {
                    //Sort on total stars
                    return resultData.sort((a, b) => b.stargazers_count - a.stargazers_count)
                })
                .then(resultData => {
                    //Remove forked repositories
                    return resultData.filter((repo) => repo.fork !== true)
                })
                .then(resultData => {
                    if (resultData.length > 8) resultData.splice(8, resultData.length);
                    setUserRepos(resultData);
                    return setIsLoading(false);
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
            return (
                <p>Loading projects...</p>
            )
        }
    }
;

export const Projects = () => {
    return (
        <Wrapper as={Container} id="projects">
            <h2>Projects</h2>
            <Grid>
                {IndexPage()}
            </Grid>
        </Wrapper>
    )
}
