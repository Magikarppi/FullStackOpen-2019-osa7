import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Div = styled.div`
  width: 550px;
    height: 30px;
    text-align: center;
    margin: 0 auto;
    padding-top: 10;
    padding-left: 2;
    border: 2px solid #8f8d64;
    border-width: 1;
    margin-bottom: 5;
    display: block;
    background: #85015d;
    &:hover {
      background: #f20049;
    }
    color: white;
`;

const H2 = styled.h2`
  margin: 0 auto;
  text-align: center;
  color: #ffadc6;
`
const H3 = styled.h3`
  margin: 0 auto;
  padding: 5px;
  text-align: center;
  color: #ffadc6;
`
const TextDiv = styled.div`
  text-align: center;
  color: white;
`;

const Users = ({ allUsers }) => {
  console.log('allUsers[0]', allUsers[0]);
  if (allUsers) {
    return (
      <div>
        <div>
          <H2>Users</H2>
          <H3>Blogs</H3>
          {allUsers.map((user) => (
            <div key={user.id}>
              <Div>
                <Link to={`/users/${user.id}`}>
                  <TextDiv>
                    {user.name} as {user.username} with {user.blogs.length} blogs
                  </TextDiv>
                </Link>
              </Div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default Users;
