import { useQuery, gql } from '@apollo/client';

const GET_USERS = gql`
  query {
  getUsers{id
  name
  email}
    
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Liste des utilisateurs</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Âge</th>
          </tr>
        </thead>
        <tbody>
          {data?.getUsers?.map((user: any) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
